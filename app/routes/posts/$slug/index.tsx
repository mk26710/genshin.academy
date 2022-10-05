import type { ActionArgs, LoaderArgs, MetaFunction, SerializeFrom } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import type { FunctionComponent } from "react";
import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "use-intl";
import { Container } from "~/components/Container";
import { ContentsTable } from "~/components/ContentsTable";
import { RoleBadge } from "~/components/RoleBadge";
import { useOptionalUser } from "~/hooks/use-optional-user";
import { deletePostById, getPostBySlugWithAuthor } from "~/models/posts.server";
import { markdownParser } from "~/utils/markdown.server";
import { canUserDeletePost, canUserEditPost } from "~/utils/permissions";
import { text } from "~/utils/responses.server";
import { getUser } from "~/utils/session.server";

type LoaderData = SerializeFrom<typeof loader>;

export const loader = async ({ params }: LoaderArgs) => {
  if (typeof params.slug !== "string") {
    throw text("Failed to obtain slug", { status: 500 });
  }

  const post = await getPostBySlugWithAuthor(params.slug);
  if (!post || !post.content) {
    throw text(`Not found`, { status: 404 });
  }

  const contentProcessed = (await markdownParser.process(post.content.raw)).toString();

  return json({
    slug: params.slug,
    post: {
      ...post,
      content: {
        processed: contentProcessed,
      },
    },
  });
};

export const action = async ({ request, params }: ActionArgs) => {
  const maybeUser = await getUser(request);

  if (request.method.toLowerCase() === "delete") {
    const slug = params.slug;
    if (typeof slug !== "string") {
      throw text("Bad Request (slug is not a string)", { status: 401 });
    }

    if (!maybeUser) {
      return text("Unauthorized", { status: 401 });
    }

    const post = await getPostBySlugWithAuthor(slug);
    if (!post) {
      return text("Post not found", { status: 404 });
    }

    if (!canUserDeletePost(maybeUser, post)) {
      throw text("You are not allowed to delete this post", { status: 403 });
    }

    await deletePostById(post.id);
    return redirect("/posts");
  }

  return null;
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data?.post) {
    return {
      title: "Post not found",
    };
  }

  return {
    title: data.post.title,
    description: data.post.description,
  };
};

const PostFooter: FunctionComponent<Pick<LoaderData, "post">> = ({ post }) => {
  const locale = useLocale();
  const t = useTranslations();

  const fetcher = useFetcher();
  const maybeUser = useOptionalUser();

  const handlePostDelete = async () => {
    const shouldDelete = confirm("Are you sure you want to delete this post?");
    if (shouldDelete) {
      fetcher.submit(new FormData(), { method: "delete" });
    }
  };

  const handlePostEdit = async () => {
    console.log("edit");
  };

  return (
    <div className="grid grid-flow-row grid-cols-1 flex-row flex-wrap gap-2 p-4 md:grid-cols-[1fr_auto] lg:p-8">
      {maybeUser && (
        <div className="mb-4 flex flex-row gap-2 md:col-span-2">
          {canUserDeletePost(maybeUser, post) && (
            <button onClick={handlePostDelete} className="button-danger">
              {t("posts.delete-post")}
            </button>
          )}
          {canUserEditPost(maybeUser, post) && (
            <button onClick={handlePostEdit} className="button">
              {t("posts.edit-post")}
            </button>
          )}
        </div>
      )}
      <div className="flex flex-grow flex-row gap-x-2">
        <img
          src={post.author?.avatarUrl ?? ""}
          alt="Author avatar"
          className="h-20 w-20 rounded-full"
        />
        <div className="flex flex-col items-start justify-center">
          <p className="text-xl font-semibold">{post.author?.name}</p>
          {post.author?.roles.map(({ title }, i) => (
            <RoleBadge role={title} key={i} />
          ))}
        </div>
      </div>

      <div className="text-sm italic">
        <p>Published on {new Date(post.publishedAt).toLocaleString(locale)}</p>
      </div>
    </div>
  );
};

const PostsSlugIndexRoute = () => {
  const { post } = useLoaderData<typeof loader>();

  const [headings, setHeadings] = useState<Array<string>>([]);
  const contentRoot = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = contentRoot.current;
    const headlineNodes = el?.querySelectorAll("h1, h2");
    if (!headlineNodes) {
      return;
    }

    const headlines = Array.from(headlineNodes);

    setHeadings(headlines.map((el) => `${el.getAttribute("id")}`));

    console.log(el?.querySelectorAll("h1, h2"));
  }, [contentRoot]);

  return (
    <Container>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_auto]">
        <article className="flex flex-col gap-4">
          <div className="card prose prose-purple flex w-full max-w-none flex-col py-8 px-4 dark:prose-invert lg:p-8">
            <h1 className="mb-0">{post.title}</h1>
            <p>{post.description}</p>
          </div>
          <div className="card flex max-w-none flex-col gap-4 divide-y bg-white p-0">
            <section
              ref={contentRoot}
              className="markdown-content prose prose-purple w-full max-w-none px-4 py-6 text-justify text-base prose-thead:border-none prose-thead:border-gray-200 dark:prose-invert dark:prose-hr:border-neutral-700 xl:px-8 xl:py-8"
              dangerouslySetInnerHTML={{ __html: post.content.processed }}
            />

            <PostFooter post={post} />
          </div>
        </article>

        <ContentsTable headings={headings} containerClassName="hidden lg:block" />
      </div>
    </Container>
  );
};

export default PostsSlugIndexRoute;

import type {
  ActionArgs,
  LinksFunction,
  LoaderArgs,
  MetaFunction,
  SerializeFrom,
} from "@remix-run/node";
import type { FunctionComponent } from "react";

import { PencilIcon, TrashIcon } from "@heroicons/react/20/solid";
import { redirect, json } from "@remix-run/node";
import { Link, useFetcher, useLoaderData } from "@remix-run/react";
import { useEffect } from "react";

import { Container } from "~/components/Container";
import { RouteLevelCatchBoundary } from "~/components/RouteLevelCatchBoundary";
import { useAfterHydration } from "~/hooks/use-hydrated";
import { useVisitorLocale } from "~/hooks/use-visitor-locale";
import { deletePostById, getPostBySlugWithAuthor } from "~/models/posts.server";
import { orUndefined } from "~/utils/helpers";
import { extractHeadings, markdownParser } from "~/utils/markdown.server";
import { generateMeta } from "~/utils/meta-generator";
import { canUserDeletePost, canUserEditPost } from "~/utils/permissions";
import { text } from "~/utils/responses.server";
import { getUser } from "~/utils/session.server";

import markdownCss from "~/styles/markdown.css";

export const handle: RouteHandle = {
  id: "post",
  withScrollRestoration: false,
};

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: markdownCss }];
};

export const loader = async ({ request, params }: LoaderArgs) => {
  if (typeof params.slug !== "string") {
    throw text("Failed to obtain slug", { status: 500 });
  }

  const post = await getPostBySlugWithAuthor(params.slug);
  if (!post || !post.content) {
    throw text(`Not found`, { status: 404 });
  }

  const vfile = await markdownParser.process(post.content.raw);

  const html = vfile.toString();
  const headings = extractHeadings(html);

  const user = await getUser(request);

  return json({
    canUser: {
      edit: canUserEditPost(user, post),
      delete: canUserDeletePost(user, post),
    },
    slug: params.slug,
    post: {
      ...post,
      content: {
        html,
        headings,
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

  return generateMeta({
    title: data.post.title,
    description: orUndefined(data.post.description),
    keywords: data.post.tags,
    imageUrl: orUndefined(data.post.thumbnailUrl),
  });
};

type PostControlsProps = {
  canDelete: boolean;
  canEdit: boolean;
};

const PostControls: FunctionComponent<PostControlsProps> = ({ canEdit, canDelete }) => {
  const fetcher = useFetcher();

  const handleDeleteClick = () => {
    const firstConfirm = confirm("Are you sure you'd like to delete that post?");
    if (!firstConfirm) {
      return;
    }

    const secondConfirm = confirm("ARE YOU ABSOLUTELY SURE ABOUT DELETING THIS POST???");
    if (!secondConfirm) {
      return;
    }

    fetcher.submit(null, { method: "delete" });
  };

  return (
    <div className="flex flex-row flex-wrap gap-2">
      {canEdit && (
        <Link to="./edit" role="button" className="button flex items-center justify-center gap-3">
          <PencilIcon className="h-5 w-5" />
          <span>Edit</span>
        </Link>
      )}

      {canDelete && (
        <button
          onClick={handleDeleteClick}
          className="button flex items-center justify-center gap-3 border-rose-600 bg-rose-600 hover:text-rose-600"
        >
          <TrashIcon className="h-5 w-5" />
          <span>Delete</span>
        </button>
      )}
    </div>
  );
};

const PostsSlugIndexRoute = () => {
  const { post, canUser } = useLoaderData<typeof loader>();

  const locale = useVisitorLocale();

  const hydratedDate = useAfterHydration(new Date(post.publishedAt));
  const hydratedPublishDate = hydratedDate?.toLocaleDateString(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  useEffect(() => {
    console.log({ canUserEditPost, post });
  }, [post, canUserEditPost]);

  return (
    <Container className="max-w-screen-xl px-[var(--default-gap)] lg:px-0">
      <div className="grid w-full grid-flow-row grid-cols-12 gap-[var(--default-gap)]">
        <div className="col-span-full mt-10 mb-10 md:col-span-10 md:col-start-2 md:mb-16 lg:col-span-8 lg:col-start-3">
          <h1 className="text-4xl font-extrabold">{post.title}</h1>
          {(canUser.edit === true || canUser.delete === true) && (
            <PostControls canEdit={canUser.edit} canDelete={canUser.delete} />
          )}
          <h4 className="font-medium opacity-60">{hydratedPublishDate}</h4>
        </div>

        <div className="col-span-full mb-16 lg:col-span-10 lg:col-start-2">
          <img className="rounded-md" src={orUndefined(post.thumbnailUrl)} />
        </div>

        <article
          className="markdown-content prose prose-blue col-span-full max-w-none md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-3"
          dangerouslySetInnerHTML={{ __html: post.content.html }}
        />

        <div className="col-span-full my-16 md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-3">
          :)
        </div>
      </div>
    </Container>
  );
};

export default PostsSlugIndexRoute;

export const CatchBoundary = () => <RouteLevelCatchBoundary />;

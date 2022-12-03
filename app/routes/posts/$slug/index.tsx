import type { ActionArgs, LoaderArgs, MetaFunction } from "@remix-run/node";
import type { FunctionComponent } from "react";
import type { RouteHandle } from "~/types/common";

import { PencilIcon, TrashIcon } from "@heroicons/react/20/solid";
import { redirect, json } from "@remix-run/node";
import { Link, useFetcher, useLoaderData } from "@remix-run/react";
import { useTranslations } from "use-intl";

import { Button } from "~/components/Button";
import { Container } from "~/components/Container";
import { RouteLevelCatchBoundary } from "~/components/RouteLevelCatchBoundary";
import { UserAvatar } from "~/components/UserAvatar";
import { UserFlair } from "~/components/UserFlair";
import { useAfterHydration } from "~/hooks/use-hydrated";
import { useVisitorLocale } from "~/hooks/use-visitor-locale";
import { deletePostById, getPostBySlugWithAuthor } from "~/models/posts.server";
import { orUndefined } from "~/utils/helpers";
import { extractHeadings, markdownParser } from "~/utils/markdown.server";
import { generateMeta } from "~/utils/meta-generator";
import { permissions, validateUserPermissions, ValidationMode } from "~/utils/permissions";
import { badRequest, notFound, serverError, unauthorized } from "~/utils/responses.server";
import { getUser } from "~/utils/session.server";

export const handle: RouteHandle = {
  id: "post",
  withScrollRestoration: false,
};

export const loader = async ({ request, params }: LoaderArgs) => {
  if (typeof params.slug !== "string") {
    throw serverError({ message: "Failed to obtain slug" });
  }

  const post = await getPostBySlugWithAuthor(params.slug);
  if (!post || !post.content) {
    throw notFound({ message: "Couldn't find post or it's content" });
  }

  const vfile = await markdownParser.process(post.content.raw);

  const html = vfile.toString();
  const headings = extractHeadings(html);

  const user = await getUser(request);

  return json({
    canUser: {
      edit: validateUserPermissions(
        user,
        permissions(post.authorId === user?.id && "EDIT_MY_POST", "EDIT_SOMEONES_POST"),
        ValidationMode.SOFT,
      ),
      delete: validateUserPermissions(
        user,
        permissions(post.authorId === user?.id && "DELETE_MY_POST", "DELETE_SOMEONES_POST"),
        ValidationMode.SOFT,
      ),
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
      throw badRequest({ message: "slug is not a string for some reason" });
    }

    if (!maybeUser) {
      return unauthorized({ message: "Failed to authorize request" });
    }

    const post = await getPostBySlugWithAuthor(slug);
    if (!post) {
      throw notFound({ message: "Couldn't find requested post" });
    }

    if (
      !validateUserPermissions(
        maybeUser,
        permissions(post.authorId === maybeUser?.id && "DELETE_MY_POST", "DELETE_SOMEONES_POST"),
        ValidationMode.SOFT,
      )
    ) {
      throw unauthorized({ message: "You can not delete this post" });
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
        <Button as={Link} color="semiblack" to="./edit" role="button" className="gap-3">
          <PencilIcon className="h-5 w-5" />
          <span>Edit</span>
        </Button>
      )}

      {canDelete && (
        <Button variant="filled" color="red" onClick={handleDeleteClick} className="gap-3">
          <TrashIcon className="h-5 w-5" />
          <span>Delete</span>
        </Button>
      )}
    </div>
  );
};

const PostsSlugIndexRoute = () => {
  const { post, canUser } = useLoaderData<typeof loader>();

  const locale = useVisitorLocale();
  const t = useTranslations();

  const hydratedDate = useAfterHydration(new Date(post.publishedAt));
  const hydratedPublishDate = hydratedDate?.toLocaleDateString(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Container className="max-w-screen-xl px-[var(--default-gap)] lg:px-0">
      <div className="grid w-full grid-flow-row grid-cols-12 gap-[var(--default-gap)]">
        <div className="col-span-full mt-10 mb-10 md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-3">
          <h1 className="text-4xl font-extrabold dark:text-white">{post.title}</h1>
          {(canUser.edit === true || canUser.delete === true) && (
            <PostControls canEdit={canUser.edit} canDelete={canUser.delete} />
          )}
          <h4 className="font-medium opacity-60">{hydratedPublishDate}</h4>
        </div>

        <div className="col-span-full mb-16 lg:col-span-10 lg:col-start-2">
          <img
            className="rounded-2xl"
            src={orUndefined(post.thumbnailUrl)}
            decoding="async"
            loading="lazy"
          />
        </div>

        <article
          className="markdown-content prose prose-purple col-span-full max-w-none dark:prose-invert dark:prose-headings:text-white dark:prose-p:text-gray-200 dark:prose-thead:border-gray-800 dark:prose-tr:border-gray-800 dark:prose-hr:border-gray-800 md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-3"
          dangerouslySetInnerHTML={{ __html: post.content.html }}
        />

        <div className="col-span-full my-16 md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-3">
          <div className="grid w-full grid-cols-[auto_1fr] gap-4">
            <UserAvatar className="h-24 w-24" avatarUrl={post.author?.avatarUrl} />
            <div className="flex items-center">
              <p className="text-lg italic">
                {t.rich("posts.post-by", {
                  name: post.author?.name,
                  author: (chunk) => (
                    <span className="font-bold">
                      <UserFlair
                        text={post.author?.flair?.text}
                        fgColor={post.author?.flair?.fgColor}
                        bgColor={post.author?.flair?.bgColor}
                      />{" "}
                      {chunk}
                    </span>
                  ),
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default PostsSlugIndexRoute;

export const CatchBoundary = () => <RouteLevelCatchBoundary />;

import type { ActionArgs, LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import type { MouseEvent } from "react";

import { redirect, json } from "@remix-run/node";
import { Link, useFetcher, useLoaderData } from "@remix-run/react";
import { Fragment } from "react";
import { useTranslations } from "use-intl";

import { Main } from "~/components/main";
import { Button } from "~/components/ui/button";
import { db } from "~/db/prisma.server";
import { useAvatarUrl } from "~/hooks/use-avatar-url";
import { useHydrated } from "~/hooks/use-hydrated";
import { useOptionalUser } from "~/hooks/use-optional-user";
import { useVisitorLocale } from "~/hooks/use-visitor-locale";
import { PostSlugSchema } from "~/schemas/posts.server";
import { statusPhrase } from "~/utils/http/status-codes.server";
import { parseMarkdown } from "~/utils/markdown.server";
import { generateTitle } from "~/utils/meta-generator";
import { plainNotFound, txt } from "~/utils/responses.server";
import { getUser, verifyEveryFlag } from "~/utils/session.server";
import { LazyImage } from "~/components/lazy-image";

export const loader = async ({ params }: LoaderArgs) => {
  const slug = await PostSlugSchema.parseAsync(params.slug);
  const post = await db.post.findFirst({
    where: {
      slug,
      content: {
        isNot: null,
      },
    },
    include: {
      content: true,
      author: true,
    },
  });

  if (post == null) {
    throw plainNotFound();
  }

  if (post.content == null) {
    throw plainNotFound();
  }

  const html = await parseMarkdown(post.content.raw);

  return json({ post, html });
};

export const meta: V2_MetaFunction<typeof loader> = ({ data }) => {
  return [
    { title: generateTitle(data?.post.title) },
    { property: "og:title", content: generateTitle(data?.post.title) },
    { name: "description", content: data?.post.description },
    { property: "og:description", content: data?.post.description },
    { property: "og:type", content: "article" },
    { property: "og:image", content: data?.post.thumbnailUrl },
    { property: "og:locale", content: data?.post.lang },
    { name: "author", content: data?.post.author?.name },
    { property: "og:article:author", content: data?.post.author?.name },
    { name: "keywords", content: data?.post.tags },
  ];
};

export default function MarkdownPost() {
  const { post, html } = useLoaderData<typeof loader>();

  const maybeUser = useOptionalUser();

  const isHydrated = useHydrated();
  const fetcher = useFetcher();
  const t = useTranslations();

  const locale = useVisitorLocale();
  const authorAvatarUrl = useAvatarUrl(post.author?.avatarUrl);

  const publishDate = new Date(post.publishedAt);

  const onDeletePost = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const confirmed = confirm("THIS ACTION CAN NOT BE REVERSED! ARE YOU SURE?");
    if (!confirmed) {
      return;
    }

    fetcher.submit(null, { method: "delete" });
  };

  return (
    <Main>
      <Main.Container>
        {maybeUser != null && (
          <div className="mb-4 flex w-full max-w-4xl flex-col gap-2 self-center rounded-box bg-base-200 p-6 shadow prose-p:text-justify">
            <h2 className="text-lg font-semibold text-gray-700">{t("posts.manage-post")}</h2>
            <div className="flex flex-row gap-2">
              <Button as={Link} to="./edit" color="semiblack">
                {t("common.edit")}
              </Button>
              <Button onClick={onDeletePost} color="red">
                {t("common.delete")}
              </Button>
            </div>
          </div>
        )}

        <div className="daisy-card z-0 mb-4 w-full max-w-4xl self-center bg-base-200">
          {post.thumbnailUrl && (
            <figure className="mb-4 aspect-video px-10 pt-10">
              <LazyImage src={post.thumbnailUrl} className="w-full rounded-xl object-cover" />
            </figure>
          )}
          <div className="daisy-card-body">
            <h1 className="daisy-card-title">{post.title}</h1>
            {post.description && <p className="mt-4 text-justify">{post.description}</p>}
          </div>
        </div>

        <div className="daisy-card z-0 mb-4 w-full max-w-4xl self-center bg-base-200">
          <div className="daisy-card-body grid grid-cols-[1fr_auto] items-center">
            <div className="flex flex-1 flex-row gap-2">
              <figure>
                <img
                  src={authorAvatarUrl}
                  className="aspect-square h-12 w-12 rounded-full object-cover"
                />
              </figure>

              <div className="flex flex-col items-center place-self-end self-end">
                <h3 className="text-lg font-bold">{post.author?.name}</h3>
                <span className="text-sm">{t("posts.author")}</span>
              </div>
            </div>

            <p className="hidden text-sm italic md:inline-block">
              {isHydrated && (
                <Fragment>
                  {Intl.DateTimeFormat(locale, {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  }).format(publishDate)}
                </Fragment>
              )}
            </p>
          </div>
        </div>

        <div className="daisy-card w-full max-w-4xl self-center bg-base-200">
          <div className="daisy-card-body">
            <article
              dangerouslySetInnerHTML={{ __html: html }}
              className="markdown-content prose daisy-prose max-w-none prose-p:text-justify prose-a:no-underline"
            />
          </div>
        </div>
      </Main.Container>
    </Main>
  );
}

export const action = async ({ request, params }: ActionArgs) => {
  const user = await getUser(request);
  if (!user) {
    return txt(statusPhrase(401), 401);
  }

  const userFlags = user.permissions.map(({ value }) => value);

  if (typeof params.slug !== "string") {
    return txt(statusPhrase(400), 400);
  }

  const post = await db.post.findUnique({
    where: {
      slug: params.slug,
    },
  });

  if (!post) {
    return txt("Post Not Found", 404);
  }

  const canDelete =
    post.authorId === user.id
      ? verifyEveryFlag({
          flags: userFlags,
          required: ["DELETE_MY_POST"],
        })
      : verifyEveryFlag({
          flags: userFlags,
          required: ["DELETE_SOMEONES_POST"],
        });

  if (!canDelete) {
    return txt("Missing Permissions", 403);
  }

  await db.post.delete({
    where: {
      id: post.id,
    },
  });

  return redirect("../");
};

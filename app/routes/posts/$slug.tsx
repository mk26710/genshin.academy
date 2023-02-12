import type { ActionArgs, LoaderArgs, MetaFunction } from "@remix-run/node";
import type { MouseEvent } from "react";

import { redirect, json } from "@remix-run/node";
import { Link, useFetcher, useLoaderData } from "@remix-run/react";
import { Fragment } from "react";
import { useTranslations } from "use-intl";

import { Main } from "~/components/main";
import { Button } from "~/components/ui/button";
import { prisma } from "~/db/prisma.server";
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

export const loader = async ({ params }: LoaderArgs) => {
  const slug = await PostSlugSchema.parseAsync(params.slug);
  const post = await prisma.post.findFirst({
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

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return {
    title: generateTitle(data?.post.title),
    "og:title": generateTitle(data?.post.title),
    description: data?.post.description,
    "og:description": data?.post.description,
    "og:type": "article",
    "og:image": data?.post.thumbnailUrl,
    "og:locale": data?.post.lang,
    author: data?.post.author?.name,
    "og:article:author": data?.post.author?.name,
    keywords: data?.post.tags,
  };
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
          <div className="mb-4 flex w-full max-w-4xl flex-col gap-2 self-center rounded-box bg-white p-6 shadow prose-p:text-justify">
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

        <div className="mb-4 w-full max-w-4xl self-center rounded-box bg-white p-6 shadow prose-p:text-justify">
          {post.thumbnailUrl && (
            <figure className="mb-4">
              <img src={post.thumbnailUrl} className="aspect-video rounded-box" />
            </figure>
          )}
          <h1 className="text-4xl font-bold">{post.title}</h1>
          {post.description && (
            <p className="mt-4 text-justify text-gray-800">{post.description}</p>
          )}
        </div>

        <div className="mb-4 flex w-full max-w-4xl flex-row items-center self-center rounded-box bg-white p-6 shadow prose-p:text-justify">
          <div className="flex flex-1 flex-row gap-2">
            <figure>
              <img
                src={authorAvatarUrl}
                className="aspect-square h-12 w-12 rounded-full object-contain"
              />
            </figure>

            <div className="flex flex-col items-center">
              <h3 className="text-lg font-bold">{post.author?.name}</h3>
              <span className="text-sm italic text-gray-700">{t("posts.author")}</span>
            </div>
          </div>

          <p className="hidden text-sm italic text-gray-700 md:inline-block">
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

        <article
          dangerouslySetInnerHTML={{ __html: html }}
          className="markdown-content prose prose-gray w-full max-w-4xl self-center rounded-box bg-white p-6 shadow prose-p:text-justify prose-a:no-underline"
        />
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

  const post = await prisma.post.findUnique({
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

  await prisma.post.delete({
    where: {
      id: post.id,
    },
  });

  return redirect("../");
};

import type { LoaderArgs } from "@remix-run/node";

import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useTranslations } from "use-intl";

import { Main } from "~/components/main";
import { prisma } from "~/db/prisma.server";
import { useAvatarUrl } from "~/hooks/use-avatar-url";
import { useVisitorLocale } from "~/hooks/use-visitor-locale";
import { PostSlugSchema } from "~/schemas/posts.server";
import { parseMarkdown } from "~/utils/markdown.server";
import { plainNotFound } from "~/utils/responses.server";

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

export default function MarkdownPost() {
  const { post, html } = useLoaderData<typeof loader>();

  const t = useTranslations();

  const locale = useVisitorLocale();
  const authorAvatarUrl = useAvatarUrl(post.author?.avatarUrl);

  const publishDate = new Date(post.publishedAt);

  return (
    <Main>
      <Main.Container>
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
            {Intl.DateTimeFormat(locale, {
              day: "numeric",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            }).format(publishDate)}
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

import type { LoaderArgs } from "@remix-run/node";

import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { Main } from "~/components/main";
import { prisma } from "~/db/prisma.server";
import { PostSlugSchema } from "~/schemas/posts.server";
import { parseMarkdown } from "~/utils/markdown.server";
import { plainNotFound } from "~/utils/responses.server";

export const loader = async ({ request, params }: LoaderArgs) => {
  const slug = await PostSlugSchema.parseAsync(params.slug);
  const post = await prisma.post.findFirst({
    where: {
      slug,
      content: { isNot: null },
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

  return (
    <Main>
      <Main.Container>
        <article
          dangerouslySetInnerHTML={{ __html: html }}
          className="markdown-content prose max-w-4xl self-center rounded-box  bg-white p-6 shadow prose-p:text-justify"
        />
      </Main.Container>
    </Main>
  );
}

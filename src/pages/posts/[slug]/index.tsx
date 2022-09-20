import type { GetServerSideProps } from "next";
import type { FC } from "react";

import { Container } from "@/components/Container";
import { ContentsTable } from "@/components/ContentsTable";
import { Layout } from "@/components/Layout";
import { RoleBadge } from "@/components/RoleBadge";
import { useCurrentLocale } from "@/hooks/use-current-locale";
import { markdownParser } from "@/server/common/markdown-parser";
import { getPostBySlugWithAuthorJsonSafe } from "@/server/db/models/posts";

interface ServerSideProps {
  post: NonNullable<Awaited<ReturnType<typeof getPostBySlugWithAuthorJsonSafe>>> & {
    content: {
      parsed: string;
    };
  };
}

const PostFooter: FC<ServerSideProps> = ({ post }) => {
  const locale = useCurrentLocale();

  return (
    <div className="flex flex-row flex-wrap gap-2 p-4 lg:p-8">
      <div className="flex flex-grow flex-row gap-x-2">
        <img
          src={post.author?.image ?? ""}
          alt="Author avatar"
          className="h-20 w-20 rounded-full"
        />
        <div className="flex flex-col items-start justify-center">
          <p className="text-xl font-semibold">{post.author?.name}</p>
          <RoleBadge role={post.author?.role ?? "REGULAR"} />
        </div>
      </div>

      <div className="text-sm italic">
        <p>Published on {new Date(post.publishedAt).toLocaleString(locale)}</p>
      </div>
    </div>
  );
};

export default function PostsSlug({ post }: ServerSideProps) {
  return (
    <Layout title={post.title}>
      <Container>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[auto_1fr]">
          <div className="card flex max-w-none flex-col gap-4 divide-y bg-white p-0">
            <h1 className="px-4 pt-4 text-2xl font-semibold lg:px-8">{post.title}</h1>
            <article
              className="markdown-content prose prose-purple w-full max-w-none px-4 py-6 text-justify text-base prose-thead:border-none prose-thead:border-gray-200 dark:prose-invert dark:prose-hr:border-neutral-700 lg:px-8 lg:py-8"
              dangerouslySetInnerHTML={{ __html: post.content.parsed }}
            />

            <PostFooter post={post} />
          </div>

          <ContentsTable title="Contents" headings={[]} />
        </div>
      </Container>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async ({
  locale = "en",
  params,
}) => {
  const post = await getPostBySlugWithAuthorJsonSafe(`${params?.slug}`);

  if (!post) {
    return {
      notFound: true,
    };
  }

  if (!post.content) {
    return {
      notFound: true,
    };
  }

  const parsed = (await markdownParser.process(post.content.raw)).toString();

  const messages = {
    common: (await import(`#/locales/${locale}/common.json`)).default,
    meta: (await import(`#/locales/${locale}/meta.json`)).default,
    footer: (await import(`#/locales/${locale}/footer.json`)).default,
  };

  return {
    props: {
      messages,
      post: {
        ...post,
        content: {
          ...post.content,
          parsed,
        },
      },
    },
  };
};

import type { GetServerSideProps } from "next";
import type { FC } from "react";

import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";

import { Container } from "@/components/Container";
import { ContentsTable } from "@/components/ContentsTable";
import { Layout } from "@/components/Layout";
import { RoleBadge } from "@/components/RoleBadge";
import { useCurrentLocale } from "@/hooks/use-current-locale";
import { markdownParser } from "@/server/common/markdown-parser";
import { getPostBySlugWithAuthorJsonSafe } from "@/server/db/models/posts";
import { canUserDeletePost, canUserEditPost } from "@/utils/permissions";

interface ServerSideProps {
  post: NonNullable<Awaited<ReturnType<typeof getPostBySlugWithAuthorJsonSafe>>> & {
    content: {
      parsed: string;
    };
  };
}

const PostFooter: FC<ServerSideProps> = ({ post }) => {
  const router = useRouter();
  const locale = useCurrentLocale();
  const t = useTranslations();

  const { data: session } = useSession();

  // Post deletion handler could be improved but since it's accessed
  // only by people from the team, this should not be an issue at all
  const handlePostDelete = async () => {
    const confirmation = confirm("Are you sure about deleting this post?");
    if (confirmation !== true) {
      return;
    }

    const response = await fetch(`/api/posts/${post.slug}/delete`);
    const status = response.status;
    if (status === 200) {
      alert("Post deleted");
      router.reload();
    } else {
      alert("Something went wrong please check network response from the api");
    }
  };

  const handlePostEdit = async () => {
    router.push({
      pathname: "/posts/[slug]/edit",
      query: { slug: post.slug },
    });
  };

  return (
    <div className="grid grid-flow-row grid-cols-1 flex-row flex-wrap gap-2 p-4 md:grid-cols-[1fr_auto] lg:p-8">
      {session?.user && (
        <div className="mb-4 flex flex-row gap-2 md:col-span-2">
          {canUserDeletePost(session.user, post) && (
            <button onClick={handlePostDelete} className="button-danger">
              {t("posts.delete-post")}
            </button>
          )}
          {canUserEditPost(session.user, post) && (
            <button onClick={handlePostEdit} className="button">
              {t("posts.edit-post")}
            </button>
          )}
        </div>
      )}
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
          <article className="flex flex-col gap-4">
            <div className="card py-8dark:prose-invert prose prose-purple flex w-full max-w-none flex-col px-4 lg:p-8">
              <h1 className="mb-0">{post.title}</h1>
              <p>{post.description}</p>
              {/* <img
                src={post.thumbnailUrl ?? ""}
                alt="Post humbnail"
                className="aspect-auto w-[50%] self-center object-cover"
              /> */}
            </div>
            <div className="card flex max-w-none flex-col gap-4 divide-y bg-white p-0">
              <section
                className="markdown-content prose prose-purple w-full max-w-none px-4 py-6 text-justify text-base prose-thead:border-none prose-thead:border-gray-200 dark:prose-invert dark:prose-hr:border-neutral-700 xl:px-8 xl:py-8"
                dangerouslySetInnerHTML={{ __html: post.content.parsed }}
              />

              <PostFooter post={post} />
            </div>
          </article>

          <ContentsTable title="Contents" headings={[]} containerClassName="hidden lg:block" />
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
    posts: (await import(`#/locales/${locale}/posts.json`)).default,
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

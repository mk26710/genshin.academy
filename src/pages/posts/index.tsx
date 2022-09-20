import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import type { FC, FormEvent } from "react";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { atom, useAtom } from "jotai";
import { useHydrateAtoms } from "jotai/utils";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/router";

import { Container } from "@/components/Container";
import { Layout } from "@/components/Layout";
import { searchPostsPaginated } from "@/server/db/models/posts";

/**
 *                  TODO
 *
 * - Need to add filtering for users and search field
 * - Would be nice to figure out inferece of GSSP and why
 *   it ignore NonNullable
 */

type ServerSideProps = {
  messages: unknown;
  posts: Awaited<ReturnType<typeof searchPostsPaginated>>;
  currentPage: number;
  itemsPerPage: number;
  totalPosts: number;
};

type PostCardProps = NonNullable<Awaited<ReturnType<typeof searchPostsPaginated>>>[0];

const PostCard: FC<PostCardProps> = ({ title, thumbnailUrl, description, slug }) => {
  return (
    <Link href={`/posts/${slug}`} prefetch={false}>
      <a className="card h-fit w-full p-0 lg:w-[calc(50%-1rem)]">
        {thumbnailUrl && (
          <img
            src={thumbnailUrl}
            alt="Post thumbnail"
            className="aspect-video w-full rounded-t-md object-cover"
          />
        )}

        <div className="p-4">
          <h1 className="text-xl font-semibold">{title}</h1>
          <p>{description}</p>
        </div>
      </a>
    </Link>
  );
};

interface PaginatorProps {
  currentPage: number;
  totalPages: number;
}

const Paginator: FC<PaginatorProps> = ({ currentPage, totalPages }) => {
  const router = useRouter();

  const incrementPage = async () => {
    if (currentPage >= totalPages) {
      return;
    }

    void router.push({ query: { ...router.query, page: currentPage + 1 } });
  };

  const decrementPage = () => {
    if (currentPage <= 1) {
      return;
    }

    void router.push({ query: { ...router.query, page: currentPage - 1 } });
  };

  return (
    <div className="inline-flex items-center justify-center gap-3 self-center">
      <button
        className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-200 bg-gray-100 disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900"
        disabled={currentPage === 1}
        onClick={decrementPage}
      >
        <ChevronLeftIcon className="h-4 w-4" />
      </button>

      <p className="text-sm">
        {currentPage}
        <span className="mx-0.25">/</span>
        {totalPages}
      </p>

      <button
        className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-200 bg-gray-100 disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900"
        disabled={currentPage === totalPages}
        onClick={incrementPage}
      >
        <ChevronRightIcon className="h-4 w-4" />
      </button>
    </div>
  );
};

type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const searchPostsAtom = atom("");

const PostsIndex = ({ posts, currentPage, itemsPerPage, totalPosts }: PageProps) => {
  const t = useTranslations();
  const router = useRouter();

  useHydrateAtoms([[searchPostsAtom, router.query?.search?.toString() ?? ""]]);

  const [search, setSearch] = useAtom(searchPostsAtom);

  const totalPages = Math.ceil((totalPosts ?? 1) / (itemsPerPage ?? 1));

  const handleSearchSubmit = async (e: FormEvent) => {
    e.preventDefault();

    void router.push({
      query: {
        ...router.query,
        search: search,
      },
    });
  };

  return (
    <Layout title={t("common.posts", { count: 99 })}>
      <Container className="mt-0">
        {posts != null && (
          <div className="flex h-full flex-col-reverse gap-2 lg:grid lg:grid-cols-[1fr_auto]">
            {posts.length > 0 && (
              <div className="flex flex-grow flex-col flex-wrap gap-2 lg:mt-4 lg:flex-row">
                {posts?.map((post) => (
                  <PostCard
                    key={post.id}
                    id={post.id}
                    slug={post.slug}
                    title={post.title}
                    description={post.description}
                    thumbnailUrl={post.thumbnailUrl}
                    status={post.status}
                    author={post.author}
                  />
                ))}
              </div>
            )}
            {posts.length <= 0 && (
              <div className="flex flex-grow items-center justify-center">Nothing here :(</div>
            )}

            <div className="sticky top-0 w-full pb-2 pt-2 lg:w-64">
              <div className="card flex flex-col gap-4 bg-white/80 backdrop-blur-lg dark:bg-neutral-800/90 lg:sticky lg:top-4">
                <form className="w-full" onSubmit={handleSearchSubmit}>
                  <input
                    type="text"
                    placeholder="Enter query here..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="input-field form-input w-full bg-gray-100 dark:bg-neutral-900"
                  />
                </form>

                <Paginator currentPage={currentPage ?? 1} totalPages={totalPages} />
              </div>
            </div>
          </div>
        )}
      </Container>
    </Layout>
  );
};

export default PostsIndex;

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async ({
  locale = "en",
  query,
}) => {
  const page = query.page != null ? parseInt(query.page.toString()) : 1;
  if (page <= 0) {
    return {
      props: {},
      notFound: true,
    };
  }

  const itemsPerPage = 6;

  const order = query.order === "asc" ? "asc" : "desc";
  const authorName = query.author == null ? undefined : query.author.toString();
  const searchTitle =
    query.search == null
      ? undefined
      : query.search.length <= 0
      ? undefined
      : query.search.toString().trim().replaceAll(/\s+/gi, " & ");

  const skip = (page - 1) * itemsPerPage;
  const take = itemsPerPage;

  const posts = await searchPostsPaginated({
    skip,
    take,
    order,
    authorName,
    searchTitle,
  });

  const messages = {
    common: (await import(`#/locales/${locale}/common.json`)).default,
    meta: (await import(`#/locales/${locale}/meta.json`)).default,
    footer: (await import(`#/locales/${locale}/footer.json`)).default,
  };

  return {
    props: {
      messages,
      posts,
      currentPage: page,
      itemsPerPage,
      totalPosts: posts.length,
    },
  };
};

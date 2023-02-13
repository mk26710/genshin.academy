import type { LoaderArgs, MetaFunction, SerializeFrom } from "@remix-run/node";
import type { FormEvent } from "react";

import {
  ChevronRightIcon,
  ChevronLeftIcon,
  ChevronDoubleRightIcon,
  ChevronDoubleLeftIcon,
  XMarkIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import { json } from "@remix-run/node";
import { Link, useLoaderData, useSearchParams } from "@remix-run/react";
import clsx from "clsx";
import { useState } from "react";

import { Main } from "~/components/main";
import { PostCard } from "~/components/post-card";
import { Input } from "~/components/ui/input";
import { db } from "~/db/prisma.server";
import { usePaginator } from "~/hooks/use-paginator";
import { PageNumSchema } from "~/schemas/common.server";
import { PostQuerySchema } from "~/schemas/posts.server";
import { resolveLocale } from "~/utils/i18n.server";
import { generateTitle } from "~/utils/meta-generator";

const POSTS_PER_PAGE = 6;

export const meta: MetaFunction = () => {
  return {
    title: generateTitle("Posts"),
  };
};

type Loader = SerializeFrom<typeof loader>;

export const loader = async ({ request }: LoaderArgs) => {
  const url = new URL(request.url);
  const lang = await resolveLocale(request);

  const q = await PostQuerySchema.parseAsync(url.searchParams.get("q"));

  const page = (await PageNumSchema.parseAsync(url.searchParams.get("page"))) ?? 1;

  const skip = (page - 1) * POSTS_PER_PAGE;
  const take = POSTS_PER_PAGE;

  const [posts, postsAggregation] = await Promise.all([
    db.post.findMany({
      skip,
      take,
      where: {
        lang,
        title: {
          search: q?.replaceAll(/\s+/gi, "+"),
        },
      },
      orderBy: {
        publishedAt: "desc",
      },
    }),
    db.post.aggregate({
      _count: true,
      where: {
        lang,
        title: {
          search: q?.replaceAll(/\s+/gi, "+"),
        },
      },
    }),
  ]);

  const maxPages = Math.ceil(postsAggregation._count / POSTS_PER_PAGE);

  return json({ posts, pages: { max: maxPages, current: page } });
};

export default function PostsHome() {
  const { posts, pages } = useLoaderData() satisfies Loader;

  const { currentPage, firstPage, prevPage, nextPage, lastPage, activePages } = usePaginator({
    max: pages.max,
    current: pages.current,
  });

  const [searchParams, setSearchParams] = useSearchParams();

  const [query, setQuery] = useState("");

  const onSubmitQuery = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newUSP = new URLSearchParams(searchParams);
    newUSP.set("q", query);
    setSearchParams(newUSP);
  };

  const onClearQuery = () => {
    const newUSP = new URLSearchParams(searchParams);
    newUSP.delete("q");
    setSearchParams(newUSP);
    setQuery("");
  };

  return (
    <Main>
      <Main.Container>
        <form onSubmit={onSubmitQuery} className="mb-4 flex gap-2">
          <button
            onClick={onClearQuery}
            type="button"
            className="flex items-center justify-center rounded-box bg-gray-800 px-2 shadow"
          >
            <XMarkIcon className="h-5 w-5 text-white" />
          </button>

          <Input
            placeholder="I like pineapples on pizza..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <button
            type="submit"
            className="flex items-center justify-center rounded-box bg-primary-500 px-2 shadow"
          >
            <MagnifyingGlassIcon className="h-5 w-5 text-white" />
          </button>
        </form>

        <div className="flex flex-col space-y-4 desktop:block desktop:columns-2">
          {posts.map(({ id, slug, thumbnailUrl, title, description }) => (
            <PostCard key={id} to={`./${slug}`}>
              <PostCard.Image src={thumbnailUrl ?? ""} />
              <PostCard.Title>{title}</PostCard.Title>
              <PostCard.Body>
                <p>{description}</p>
              </PostCard.Body>
            </PostCard>
          ))}
        </div>

        <nav
          className="isolate mt-6 mb-4 inline-flex -space-x-px self-center rounded-md"
          aria-label="Pagination"
        >
          <button
            onClick={firstPage}
            className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
          >
            <span className="sr-only">First</span>
            <ChevronDoubleLeftIcon className="h-5 w-5" aria-hidden="true" />
          </button>

          <button
            onClick={prevPage}
            className="relative inline-flex items-center border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
          >
            <span className="sr-only">Previous</span>
            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
          </button>

          {activePages.map((page) => (
            <Link
              key={`pagination:${page}`}
              to={`?page=${page}`}
              className={clsx(
                page === currentPage
                  ? "relative z-10 inline-flex items-center border border-indigo-500 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 focus:z-20"
                  : "relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20",
              )}
            >
              {page}
            </Link>
          ))}

          <button
            onClick={nextPage}
            className="relative inline-flex items-center border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
          >
            <span className="sr-only">Next</span>
            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
          </button>

          <button
            onClick={lastPage}
            className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
          >
            <span className="sr-only">Last</span>
            <ChevronDoubleRightIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </nav>
      </Main.Container>
    </Main>
  );
}

import type { LoaderArgs, MetaFunction, SerializeFrom } from "@remix-run/node";
import type { FormEvent } from "react";
import type { RouteHandle } from "~/types/common";

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
import { clsx } from "clsx";
import { useState } from "react";
import { Main } from "~/components/main";
import { db } from "~/db/prisma.server";
import { usePaginator } from "~/hooks/use-paginator";
import { PageNumSchema } from "~/schemas/common.server";
import { PostQuerySchema } from "~/schemas/posts.server";
import { resolveLocale } from "~/utils/i18n.server";
import { generateTitle } from "~/utils/meta-generator";

const POSTS_PER_PAGE = 6;

export const handle: RouteHandle = {
  hasSearch: true,
};

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
        <form onSubmit={onSubmitQuery} className="daisy-form-control mb-4">
          <div className="daisy-input-group">
            <button
              onClick={onClearQuery}
              type="button"
              className="daisy-btn-square daisy-btn bg-base-200 hover:bg-base-100"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
            <input
              type="text"
              placeholder="Search…"
              className="daisy-input-bordered daisy-input w-full"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="daisy-btn-square daisy-btn bg-base-200 hover:bg-base-100">
              <MagnifyingGlassIcon className="h-5 w-5" />
            </button>
          </div>
        </form>

        <div className="flex flex-1 flex-col space-y-4 md:block md:columns-2 desktop:block desktop:columns-3">
          {posts.map(({ id, slug, thumbnailUrl, title, description }) => (
            <Link
              key={id}
              to={`./${slug}`}
              className="daisy-card break-inside-avoid overflow-y-hidden bg-base-200 shadow-xl "
            >
              <figure className="px-10 pt-10">
                <img src={thumbnailUrl ?? ""} className="aspect-video rounded-box object-cover" />
              </figure>

              <div className="daisy-card-body items-center text-center">
                <h2 className="daisy-card-title">{title}</h2>
                <p>{description}</p>
                <div className="daisy-card-actions mt-2">
                  <button className="daisy-btn-primary daisy-btn">Read Now</button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <nav
          className="isolate mt-6 mb-4 inline-flex gap-x-1  self-center rounded-md"
          aria-label="Pagination"
        >
          <button onClick={firstPage} className="daisy-btn-circle daisy-btn relative">
            <span className="sr-only">First</span>
            <ChevronDoubleLeftIcon className="h-5 w-5" aria-hidden="true" />
          </button>

          <button onClick={prevPage} className="daisy-btn-circle daisy-btn relative">
            <span className="sr-only">Previous</span>
            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
          </button>

          {activePages.map((page) => (
            <Link
              key={`pagination:${page}`}
              to={`?page=${page}`}
              className={clsx(
                "daisy-btn-circle daisy-btn relative",
                page === currentPage ? "daisy-btn-primary text-primary-content" : null,
              )}
            >
              {page}
            </Link>
          ))}

          <button onClick={nextPage} className="daisy-btn-circle daisy-btn relative">
            <span className="sr-only">Next</span>
            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
          </button>

          <button onClick={lastPage} className="daisy-btn-circle daisy-btn relative">
            <span className="sr-only">Last</span>
            <ChevronDoubleRightIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </nav>
      </Main.Container>
    </Main>
  );
}

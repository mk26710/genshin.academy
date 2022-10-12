import type { LoaderArgs, MetaFunction, SerializeFrom } from "@remix-run/node";
import type { ChangeEvent, FormEvent } from "react";

import { json, Response } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useTranslations } from "use-intl";

import { PostCard } from "~/components/cards/PostCard";
import { Container } from "~/components/Container";
import { Paginator } from "~/components/Paginator";
import { countSearchPostsPaginated, searchPostsPaginated } from "~/models/posts.server";
import { PostsSearch } from "~/schemas/posts";

export const loader = async ({ request }: LoaderArgs) => {
  const url = new URL(request.url);

  const pageParam = url.searchParams.get("page");
  const page = pageParam != null ? parseInt(pageParam.toString()) : 1;
  const postsPerPage = 6;

  const searchLangs = await Promise.resolve(url.searchParams.get("lang"))
    .then((val) => val?.split(",") ?? [])
    .then((arr) => arr.filter((el) => el.length > 0)) // filter out empty strings
    .then((arr) => [...new Set(arr)]); // make an array of uniques

  const parseResult = PostsSearch.safeParse({
    skip: (page - 1) * postsPerPage,
    take: postsPerPage,
    order: url.searchParams.get("order") ?? undefined,
    authorName: url.searchParams.get("author") ?? undefined,
    type: url.searchParams.get("type") ?? undefined,
    query: url.searchParams.get("search")?.toString().trim().replaceAll(/\s+/gi, " & "),
    lang: searchLangs,
  });

  if (parseResult.success !== true) {
    throw new Response("Bad Request", { status: 400, statusText: "Bad Request" });
  }

  const { skip, take, lang, order, type, authorName, query: searchTitle } = parseResult.data;
  const searchOptions = {
    skip,
    take,
    lang,
    order,
    type,
    authorName,
    searchTitle,
  };

  const totalPosts = await countSearchPostsPaginated(searchOptions);
  const posts = await searchPostsPaginated(searchOptions);

  const totalPages = Math.ceil(totalPosts / postsPerPage);

  return json({ posts, totalPages, page, searchLangs });
};

type LoaderData = SerializeFrom<typeof loader>;

export const meta: MetaFunction = () => {
  return {
    title: "Posts - GENSHIN.ZENLESS",
  };
};

const PostsIndexRoute = () => {
  const t = useTranslations();

  const { posts, page, totalPages, searchLangs } = useLoaderData() as LoaderData;
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearchSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const searchQuery = formData.get("search-query");

    if (typeof searchQuery !== "string") {
      return;
    }

    const newSearchParams = new URLSearchParams(searchParams);
    if (!searchQuery) {
      newSearchParams.delete("search");
    } else {
      newSearchParams.set("search", searchQuery);
    }

    setSearchParams(newSearchParams);
  };

  const handleLanguageSelect = async (e: ChangeEvent<HTMLInputElement>) => {
    // make set of selected languages and provdei empty as default
    const langs = new Set(searchParams.get("lang")?.split(",") ?? []);

    if (e.target.checked && !langs.has(e.target.value)) {
      langs.add(e.target.value);
    } else if (!e.target.checked && langs.has(e.target.value)) {
      langs.delete(e.target.value);
    }

    const newSearch = new URLSearchParams(searchParams);
    if (langs.size > 0) {
      newSearch.set("lang", [...langs].join(","));
    } else {
      newSearch.delete("lang");
    }

    setSearchParams(newSearch);
  };

  useEffect(() => {
    console.log(searchLangs);
  }, []);

  return (
    <Container className="px-0 pt-0 lg:px-[var(--default-gap)]">
      <div className="grid h-full grid-rows-[auto_auto] gap-[var(--default-gap)] lg:grid-cols-[1fr_auto] lg:grid-rows-1">
        <div className="card sticky top-[var(--header-height)] z-[5] flex h-fit w-full flex-col rounded-none border-b border-t-0 bg-white lg:top-[calc(var(--header-height)_+_var(--default-gap))] lg:w-64 lg:rounded-md lg:border-r lg:border-l lg:border-t">
          <form onSubmit={handleSearchSubmit}>
            <input
              name="search-query"
              placeholder={t("common.enter-query")}
              className="input-field mb-2"
            />
          </form>

          <Paginator page={page} totalPages={totalPages} />

          <div role="group">
            <label>
              <input
                type="checkbox"
                name="lang"
                value="ru"
                onChange={handleLanguageSelect}
                checked={searchLangs.includes("ru")}
              />{" "}
              ru
            </label>

            <label>
              <input
                type="checkbox"
                name="lang"
                value="en"
                onChange={handleLanguageSelect}
                checked={searchLangs.includes("en")}
              />{" "}
              en
            </label>
          </div>
        </div>

        {posts.length <= 0 && (
          <div className="flex h-full w-full items-center justify-center lg:row-end-1">
            Nothing here :(
          </div>
        )}

        {posts.length > 0 && (
          <div className="columns-1 space-y-[var(--default-gap)] px-[var(--default-gap)] lg:row-end-1 lg:columns-2 lg:px-0 lg:pt-[var(--default-gap)]">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                slug={post.slug}
                title={post.title}
                description={post.description}
                thumbnailUrl={post.thumbnailUrl}
                publishedAt={new Date(post.publishedAt)}
              />
            ))}
          </div>
        )}
      </div>
    </Container>
  );
};

export default PostsIndexRoute;

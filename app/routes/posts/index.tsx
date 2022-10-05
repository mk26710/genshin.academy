import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Response } from "@remix-run/node";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import { useEffect, useState } from "react";
import { Container } from "~/components/Container";
import { searchPostsPaginated } from "~/models/posts.server";
import { PostsSearch } from "~/schemas/posts";
import { resolveLocale } from "~/utils/i18n.server";

type LoaderData = {
  page: number;
  posts: Awaited<ReturnType<typeof searchPostsPaginated>>;
};

export const loader: LoaderFunction = async ({ request }) => {
  const locale = await resolveLocale(request);

  const url = new URL(request.url);

  const pageParam = url.searchParams.get("page");
  const page = pageParam != null ? parseInt(pageParam.toString()) : 1;
  const postsPerPage = 6;

  const parseResult = PostsSearch.safeParse({
    skip: (page - 1) * postsPerPage,
    take: postsPerPage,
    order: url.searchParams.get("order") ?? undefined,
    authorName: url.searchParams.get("author") ?? undefined,
    type: url.searchParams.get("type") ?? undefined,
    query: url.searchParams.get("search")?.toString().trim().replaceAll(/\s+/gi, " & "),
    lang: url.searchParams.get("lang")?.split(",") ?? [locale],
  });

  if (parseResult.success !== true) {
    console.error(parseResult.error);
    throw new Response("Bad Request", { status: 400, statusText: "Bad Request" });
  }

  const { skip, take, lang, order, type, authorName, query: searchTitle } = parseResult.data;

  const posts = await searchPostsPaginated({
    skip,
    take,
    lang,
    order,
    type,
    authorName,
    searchTitle,
  });

  return json<LoaderData>({ posts, page });
};

const PostsIndexRoute = () => {
  const { posts, page } = useLoaderData() as LoaderData;
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    console.log(posts);
  }, [posts]);

  const handlePageIncrease = () => {
    setSearchParams({ page: `${page + 1}` });
  };

  return (
    <Container>
      hello
      <button onClick={handlePageIncrease}>+Page {page}</button>
    </Container>
  );
};

export default PostsIndexRoute;

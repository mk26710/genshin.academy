import type { LoaderArgs, MetaFunction, SerializeFrom } from "@remix-run/node";

import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { Main } from "~/components/main";
import { PostCard } from "~/components/post-card";
import { prisma } from "~/db/prisma.server";
import { usePaginator } from "~/hooks/use-paginator";
import { PageNumSchema } from "~/schemas/common.server";
import { resolveLocale } from "~/utils/i18n.server";

const POSTS_PER_PAGE = 10;

export const meta: MetaFunction = () => {
  return {
    title: "Posts",
  };
};

type Loader = SerializeFrom<typeof loader>;

export const loader = async ({ request }: LoaderArgs) => {
  const url = new URL(request.url);
  const lang = await resolveLocale(request);

  const page = (await PageNumSchema.parseAsync(url.searchParams.get("page"))) ?? 1;

  const skip = (page - 1) * POSTS_PER_PAGE;
  const take = POSTS_PER_PAGE;

  const [posts, postsAggregation] = await Promise.all([
    prisma.post.findMany({
      skip,
      take,
      where: {
        lang,
      },
      orderBy: {
        publishedAt: "desc",
      },
    }),
    prisma.post.aggregate({
      _count: true,
      where: {
        lang,
      },
    }),
  ]);

  const maxPages = Math.ceil(postsAggregation._count / POSTS_PER_PAGE);

  return json({ posts, pages: { max: maxPages, current: page } });
};

export default function PostsHome() {
  const { posts, pages } = useLoaderData() satisfies Loader;

  const {} = usePaginator({ max: pages.max, current: pages.current });

  return (
    <Main>
      <Main.Container>
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
      </Main.Container>
    </Main>
  );
}

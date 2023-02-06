import type { LoaderArgs, MetaFunction, SerializeFrom } from "@remix-run/node";

import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { Main } from "~/components/main";
import { PostCard } from "~/components/post-card";
import { prisma } from "~/db/prisma.server";
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

  const posts = await prisma.post.findMany({
    skip,
    take,
    where: {
      lang,
    },
    orderBy: {
      publishedAt: "desc",
    },
  });

  return json({ posts });
};

export default function PostsHome() {
  const { posts } = useLoaderData() satisfies Loader;

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

import type { LoaderArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { PostCard } from "~/components/cards/post-card";

import { Main } from "~/components/main";
import { db } from "~/db/prisma.server";
import { resolveLocale } from "~/utils/i18n.server";
import { generateTitle } from "~/utils/meta-generator";

export const meta: MetaFunction = () => {
  return {
    title: generateTitle("Home"),
  };
};

export const loader = async ({ request }: LoaderArgs) => {
  const userLocale = await resolveLocale(request);
  const latestPost = await db.post.findFirst({
    where: {
      lang: userLocale ?? "en",
    },
    orderBy: {
      publishedAt: "desc",
    },
  });

  return json({ latestPost });
};

export default function HomePage() {
  const { latestPost } = useLoaderData<typeof loader>();

  return (
    <Main>
      <Main.Container className="flex flex-1 flex-col space-y-4 md:block md:columns-2 desktop:block desktop:columns-3">
        {latestPost != null && (
          <PostCard
            slug={latestPost.slug}
            title={latestPost.title}
            description={latestPost.description}
            thumbnailUrl={latestPost.thumbnailUrl}
          />
        )}
      </Main.Container>
    </Main>
  );
}

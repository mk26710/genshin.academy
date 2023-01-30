import type { LoaderArgs, MetaFunction, SerializeFrom } from "@remix-run/node";
import type { RouteHandle } from "~/types/common";

import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useEffect } from "react";

import { BirthdayCard } from "~/components/cards/BirthdayCard";
import { PostCard } from "~/components/cards/PostCard";
import { Main } from "~/components/Main";
import { prisma } from "~/db/prisma.server";
import { getLatestPost } from "~/models/posts.server";
import { resolveLocale } from "~/utils/i18n.server";
import { generateMeta } from "~/utils/meta-generator";

export const handle: RouteHandle = {
  id: "home",
  withScrollRestoration: true,
};

export const loader = async ({ request }: LoaderArgs) => {
  const resolvedLocale = await resolveLocale(request);

  const latestPost = await getLatestPost({ lang: resolvedLocale });

  const now = new Date();
  const nowDay = now.getUTCDate();
  const nowMonth = now.getUTCMonth() + 1;

  const birthdays = await prisma.characterEntry.findMany({
    where: {
      locale: resolvedLocale,
      meta: {
        birthDay: nowDay,
        birthMonth: nowMonth,
      },
    },
    include: {
      meta: {
        include: {
          assets: {
            where: {
              type: "ICON",
            },
          },
        },
      },
    },
  });

  return json({ latestPost, birthdays });
};

export type Loader = SerializeFrom<typeof loader>;

export const meta: MetaFunction = () =>
  generateMeta({
    title: "Home",
  });

const IndexRoute = () => {
  const { latestPost, birthdays } = useLoaderData() as Loader;

  useEffect(() => {
    console.log(birthdays);
  }, []);

  return (
    <Main>
      <Main.Container>
        <div className="columns-1 space-y-[var(--default-gap)] md:columns-2 lg:columns-3">
          {latestPost && (
            <PostCard
              slug={latestPost.slug}
              title={latestPost.title}
              description={latestPost.description}
              publishedAt={new Date(latestPost.publishedAt)}
              thumbnailUrl={latestPost.thumbnailUrl}
            />
          )}

          {birthdays.map((entry) => (
            <BirthdayCard
              key={entry.id}
              id={entry.meta?.id ?? "unknown"}
              name={entry.name}
              iconUrl={entry.meta?.assets.find((asset) => asset.type === "ICON")?.url}
            />
          ))}
        </div>
      </Main.Container>
    </Main>
  );
};

export default IndexRoute;

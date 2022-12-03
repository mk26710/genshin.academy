import type { LoaderArgs, MetaFunction, SerializeFrom } from "@remix-run/node";
import type { RouteHandle } from "~/types/common";

import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useEffect } from "react";

import { BirthdayCard } from "~/components/cards/BirthdayCard";
import { PostCard } from "~/components/cards/PostCard";
import { Container } from "~/components/Container";
import { getCharactersByBirthday } from "~/models/characters.server";
import { getLatestPost } from "~/models/posts.server";
import { resolveLocale } from "~/utils/i18n.server";
import { defaultLocale } from "~/utils/locales";
import { generateMeta } from "~/utils/meta-generator";

export const handle: RouteHandle = {
  id: "home",
  withScrollRestoration: true,
};

type LoaderData = SerializeFrom<typeof loader>;

export const loader = async ({ request }: LoaderArgs) => {
  const resolvedLocale = await resolveLocale(request);

  const latestPost = await getLatestPost({ lang: resolvedLocale });

  const now = new Date();
  const nowDay = now.getUTCDate();
  const nowMonth = now.getUTCMonth() + 1;

  const charactersWithBirthdays = await getCharactersByBirthday(nowDay, nowMonth, {
    langs: [resolvedLocale, defaultLocale],
  });

  return json({ latestPost, charactersWithBirthdays });
};

export const meta: MetaFunction = () =>
  generateMeta({
    title: "Home",
  });

const IndexRoute = () => {
  const { latestPost, charactersWithBirthdays } = useLoaderData() as LoaderData;

  useEffect(() => {
    console.log(charactersWithBirthdays);
  }, []);

  return (
    <Container>
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

        {charactersWithBirthdays.map((c) => (
          <BirthdayCard
            key={c.id}
            id={c.id}
            // @ts-expect-error - has at least one element in the array
            name={c.identity.at(0)?.name}
            iconUrl={c.assets.find((asset) => asset.type === "ICON")?.url}
          />
        ))}
      </div>
    </Container>
  );
};

export default IndexRoute;

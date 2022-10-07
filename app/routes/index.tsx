import type { LoaderArgs, MetaFunction, SerializeFrom } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { PostCard } from "~/components/cards/PostCard";
import { Container } from "~/components/Container";
import { getLatestPost } from "~/models/posts.server";
import { resolveLocale } from "~/utils/i18n.server";

type LoaderData = SerializeFrom<typeof loader>;

export const loader = async ({ request }: LoaderArgs) => {
  const resolvedLocale = await resolveLocale(request);

  const latestPost = await getLatestPost({ lang: resolvedLocale });

  return json({ latestPost });
};

export const meta: MetaFunction = () => ({
  title: "Home - GENSHIN.ZENLESS",
});

const IndexRoute = () => {
  const { latestPost } = useLoaderData() as LoaderData;

  return (
    <Container>
      <div className="columns-1 md:columns-2 lg:columns-3">
        {/* test */}
        {latestPost && (
          <PostCard
            slug={latestPost.slug}
            title={latestPost.title}
            description={latestPost.description}
            publishedAt={new Date(latestPost.publishedAt)}
            thumbnailUrl={latestPost.thumbnailUrl}
          />
        )}
      </div>
    </Container>
  );
};

export default IndexRoute;

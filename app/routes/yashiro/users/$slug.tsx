import type { LoaderArgs, MetaFunction } from "@remix-run/node";

import { useCatch } from "@remix-run/react";

import { Container } from "~/components/Container";
import { getUserByNameOrId } from "~/models/user.server";
import { generateMeta } from "~/utils/meta-generator";
import { userHasAnyRole } from "~/utils/permissions";
import { text } from "~/utils/responses.server";
import { ensureAuthorizedUser } from "~/utils/session.server";

export const loader = async ({ request, params }: LoaderArgs) => {
  await ensureAuthorizedUser(request, async (user) => userHasAnyRole(user, "ADMIN"));

  if (typeof params?.slug !== "string") {
    throw text("Something went wrong with the slug.", { status: 500 });
  }

  console.log({ slug: params.slug });

  const user = await getUserByNameOrId(params.slug);
  if (!user) {
    throw text("User not found.", { status: 404 });
  }

  return { user };
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data?.user) {
    return generateMeta({
      title: "User not found",
    });
  }

  return generateMeta({
    title: data.user.name,
    imageUrl: data.user.avatarUrl,
  });
};

const YashiroUsersSlugRoute = () => {
  return <Container>yes</Container>;
};

export default YashiroUsersSlugRoute;

export const CatchBoundary = () => {
  const caught = useCatch();

  return (
    <Container className="flex items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <h3 className="text-8xl font-bold">{caught.status}</h3>
        <p className="opacity-70">{caught.statusText}</p>
      </div>
    </Container>
  );
};

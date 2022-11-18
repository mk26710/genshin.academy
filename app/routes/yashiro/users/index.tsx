import type { HeadersFunction, LoaderArgs, MetaFunction } from "@remix-run/node";
import type { RouteHandle } from "~/types/common";

import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { UserCard } from "~/components/cards/UserCard";
import { Container } from "~/components/Container";
import { prisma } from "~/db/prisma.server";
import { generateMeta } from "~/utils/meta-generator";
import { permissions, validateUserPermissions, ValidationMode } from "~/utils/permissions";
import { authorizeUser } from "~/utils/session.server";

export const handle: RouteHandle = {
  id: "yashiro.users",
  withScrollRestoration: true,
};

export const meta: MetaFunction = () =>
  generateMeta({
    title: "Website Users",
    noIndex: true,
  });

export const headers: HeadersFunction = () => ({
  "X-Robots-Tag": "noindex",
});

export const loader = async ({ request }: LoaderArgs) => {
  await authorizeUser(request, async (user) =>
    validateUserPermissions(user, permissions("EDIT_USER"), ValidationMode.SOFT),
  );

  const registeredUsers = await prisma.user.findMany({
    include: { roles: true },
    orderBy: { createdAt: "desc" },
  });

  return json({ registeredUsers });
};

const YashiroUsersRoute = () => {
  const { registeredUsers } = useLoaderData<typeof loader>();

  return (
    <Container>
      <div className="flex w-full flex-wrap gap-2">
        {registeredUsers.map((user) => (
          <UserCard key={user.id} {...user} to={`./${user.id}/overview`} isLink />
        ))}
      </div>
    </Container>
  );
};

export default YashiroUsersRoute;

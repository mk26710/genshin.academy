import type { LoaderArgs } from "@remix-run/node";

import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { UserCard } from "~/components/cards/UserCard";
import { Container } from "~/components/Container";
import { prisma } from "~/db/prisma.server";
import { userHasAnyRole } from "~/utils/permissions";
import { ensureAuthorizedUser } from "~/utils/session.server";

export const handle: RouteHandle = {
  id: "yashiro.users",
  withScrollRestoration: true,
};

export const loader = async ({ request }: LoaderArgs) => {
  await ensureAuthorizedUser(request, async (user) => userHasAnyRole(user, "ADMIN"));

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

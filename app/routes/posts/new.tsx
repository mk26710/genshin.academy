import type { UserRole } from "@prisma/client";
import type { LoaderFunction } from "@remix-run/node";
import { Container } from "~/components/Container";
import type { ensureAuthenticatedUser } from "~/utils/session.server";
import { ensureAuthorizedUser } from "~/utils/session.server";

const allowedRoles: UserRole[] = ["OWNER", "ADMIN", "WRITER"];

const accessLevelPredicate = async (user: Awaited<ReturnType<typeof ensureAuthenticatedUser>>) =>
  user.roles.some((role) => allowedRoles.includes(role.title));

export const loader: LoaderFunction = async ({ request }) => {
  await ensureAuthorizedUser(request, accessLevelPredicate);
  return null;
};

const PostsNewRoute = () => {
  return <Container>test</Container>;
};

export default PostsNewRoute;

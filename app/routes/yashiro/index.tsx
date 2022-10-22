import type { LoaderArgs } from "@remix-run/node";

import { Link } from "@remix-run/react";

import { Container } from "~/components/Container";
import { userHasAnyRole } from "~/utils/permissions";
import { ensureAuthorizedUser } from "~/utils/session.server";

export const loader = async ({ request }: LoaderArgs) => {
  await ensureAuthorizedUser(request, async (user) => userHasAnyRole(user, "ADMIN"));

  return null;
};

const YashiroRoute = () => {
  return (
    <Container className="flex items-center justify-center">
      <div className="flex flex-col">
        <h2 className="text-2xl font-semibold">Hmm, what do you want to do?</h2>
        <div className="flex flex-col gap-2 md:flex-row">
          <Link to="./users" role="button" className="button">
            Mange users
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default YashiroRoute;

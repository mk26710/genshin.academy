import type { HeadersFunction, LoaderArgs, MetaFunction } from "@remix-run/node";
import type { RouteHandle } from "~/types/common";

import { Link } from "@remix-run/react";

import { Container } from "~/components/Container";
import { generateMeta } from "~/utils/meta-generator";
import { permissions, validateUserPermissions, ValidationMode } from "~/utils/permissions";
import { authorizeUser } from "~/utils/session.server";

export const handle: RouteHandle = {
  id: "yashiro.home",
  withScrollRestoration: true,
};

export const meta: MetaFunction = () => {
  return generateMeta({
    title: "Yashiro",
    noIndex: true,
  });
};

export const headers: HeadersFunction = () => ({
  "X-Robots-Tag": "noindex",
});

export const loader = async ({ request }: LoaderArgs) => {
  await authorizeUser(request, async (user) =>
    validateUserPermissions(user, permissions("EDIT_USER"), ValidationMode.SOFT),
  );

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

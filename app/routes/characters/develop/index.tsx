import type { LoaderArgs } from "@remix-run/node";

import { permissions, validateUserPermissions, ValidationMode } from "~/utils/permissions";
import { authorizeUser } from "~/utils/session.server";

export const loader = async ({ request }: LoaderArgs) => {
  await authorizeUser(request, async (user) =>
    validateUserPermissions(user, permissions("NEW_CHARACTER"), ValidationMode.SOFT),
  );

  return null;
};

export default function NewCharacterIndex() {
  return <p>this is index</p>;
}

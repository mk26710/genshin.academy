import type { LoaderArgs } from "@remix-run/node";

import { redirect } from "@remix-run/node";

import { Container } from "~/components/Container";
import { getAuthenticatedUser } from "~/utils/session.server";

export const loader = async ({ request }: LoaderArgs) => {
  const user = await getAuthenticatedUser(request);
  if (user.enabled === true) {
    return redirect("/");
  }

  return null;
};

export default function MeAccountDisabled() {
  return (
    <Container className="flex items-center justify-center">
      <div className="flex flex-col flex-wrap">
        <h2 className="text-center align-middle text-4xl font-extrabold">
          Your account is disabled
        </h2>
        <p className="text-center align-middle">
          For further details, please, contact website administrator
        </p>
      </div>
    </Container>
  );
}

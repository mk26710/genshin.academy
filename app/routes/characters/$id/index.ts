import type { LoaderArgs } from "@remix-run/node";

import { redirect } from "@remix-run/node";

export async function loader({ params }: LoaderArgs) {
  return redirect(`/characters/${params.id}/overview`);
}

import type { ActionArgs, ActionFunction } from "@remix-run/node";

import { Response } from "@remix-run/node";

import { logout } from "~/utils/session.server";

export const action: ActionFunction = async ({ request }: ActionArgs) => {
  return logout(request, null);
};

export const loader = async () => {
  throw new Response("Method Not Allowed", { status: 405, statusText: "Method Not Allowed" });
};

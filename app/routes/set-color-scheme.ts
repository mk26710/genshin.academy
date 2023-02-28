import type { ActionFunction } from "@remix-run/node";

import { isColorScheme } from "~/utils/color-scheme/common";
import { setColorScheme } from "~/utils/color-scheme/common.server";
import { isString } from "~/utils/helpers";
import { badRequest } from "~/utils/responses.server";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const wantedColorScheme = formData.get("color-scheme");
  if (!isString(wantedColorScheme)) {
    throw badRequest({ error: { message: "New color scheme must be a string" } });
  }

  if (!isColorScheme(wantedColorScheme)) {
    return badRequest({ error: { message: "Invalid color scheme" } });
  }

  return setColorScheme(wantedColorScheme);
};

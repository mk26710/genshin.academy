import type { ActionArgs } from "@remix-run/node";

import { isColorScheme } from "~/utils/color-scheme/common";
import { setColorScheme } from "~/utils/color-scheme/common.server";
import { safeRedirect } from "~/utils/helpers";
import { badRequest } from "~/utils/responses.server";

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();

  const desiredColorScheme = formData.get("colorScheme");
  const redirectTo = safeRedirect(formData.get("redirectTo"), "/");

  if (!isColorScheme(desiredColorScheme)) {
    throw badRequest("Invalid color scheme");
  }

  return await setColorScheme(desiredColorScheme, redirectTo);
};

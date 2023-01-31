import type { ActionFunction } from "@remix-run/node";
import type { UserLocale } from "~/utils/locales";

import { redirect } from "@remix-run/node";

import { safeRedirect } from "~/utils/helpers";
import { localeCookie, safePickLocale } from "~/utils/i18n.server";
import { supportedLocales } from "~/utils/locales";
import { badRequest, serverError } from "~/utils/responses.server";

export const action: ActionFunction = async ({ request, params }) => {
  if (typeof params.slug !== "string") {
    return serverError({ message: "Slug is not a string" });
  }

  if (!supportedLocales.includes(params.slug as UserLocale)) {
    return badRequest({ message: "Unsupported locale was provided" });
  }

  const newLanguage = safePickLocale(params.slug);

  const url = new URL(request.url);
  const redirectTo = safeRedirect(url.searchParams.get("redirect"));

  const langCookie = await localeCookie.serialize(newLanguage);

  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": langCookie,
    },
  });
};

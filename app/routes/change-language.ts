import type { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { safeRedirect } from "~/utils/helpers";
import { localeCookie, safePickLocale } from "~/utils/i18n.server";

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);

  const newLanguage = safePickLocale(url.searchParams.get("lang"));
  const redirectTo = safeRedirect(url.searchParams.get("redirect"));

  const langCookie = await localeCookie.serialize(newLanguage);

  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": langCookie,
    },
  });
};

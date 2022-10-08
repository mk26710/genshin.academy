import type { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { safeRedirect } from "~/utils/helpers";
import { localeCookie, safePickLocale } from "~/utils/i18n.server";
import { supportedLocales } from "~/utils/locales";
import { text } from "~/utils/responses.server";

export const loader: LoaderFunction = async ({ request, params }) => {
  if (typeof params.slug !== "string") {
    return text("Slug is not a string", { status: 500 });
  }

  if (!supportedLocales.includes(params.slug)) {
    return text(`Unsupported locale was provided`, { status: 400 });
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
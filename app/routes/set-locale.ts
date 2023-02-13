import type { ActionFunction } from "@remix-run/node";

import { Headers } from "@remix-run/node";

import { isString } from "~/utils/helpers";
import { localeCookie, safePickLocale } from "~/utils/i18n.server";
import { txt } from "~/utils/responses.server";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const wantedLocale = formData.get("locale");
  if (!isString(wantedLocale)) {
    throw txt("Invalid Locale Type (must be string)", 400);
  }

  const newLocale = safePickLocale(wantedLocale);
  const setCookie = await localeCookie.serialize(newLocale);

  const headers = new Headers();
  headers.set("Set-Cookie", setCookie);

  return new Response(undefined, {
    headers,
    status: 200,
    statusText: "OK",
  });
};

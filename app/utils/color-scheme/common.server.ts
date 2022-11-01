import type { ColorScheme } from "~/utils/color-scheme/common";

import { createCookie, redirect } from "@remix-run/node";

import { isColorScheme } from "~/utils/color-scheme/common";
import { safeRedirect } from "~/utils/helpers";

export const colorSchemeCookie = createCookie("color-scheme", {
  path: "/",
  httpOnly: false,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production" ? true : false,
});

export const getColorScheme = async (request: Request) => {
  const cookies = request.headers.get("Cookie");
  const data = await colorSchemeCookie.parse(cookies);
  if (!isColorScheme(data)) {
    return null;
  }

  return data;
};

export const setColorScheme = async (setTo: ColorScheme, redirectTo = "/") => {
  if (!isColorScheme(setTo)) {
    throw TypeError(`Tried to set color scheme to an invalid one`);
  }

  const safeRedirectTo = safeRedirect(redirectTo);

  const headers = new Headers();
  headers.set("Set-Cookie", await colorSchemeCookie.serialize(setTo));

  return redirect(safeRedirectTo, { headers });
};

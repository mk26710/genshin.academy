import fs from "fs/promises";
import path from "path";
import acceptLanguageParser from "accept-language-parser";
import { defaultLocale, supportedLocales } from "./locales";
import { createCookie } from "@remix-run/node";

export const localeCookie = createCookie("ZENLESS_LOCALE", {
  maxAge: 2_592_000, // 30 days
  path: "/",
  httpOnly: false,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
});

export const safePickLocale = (locale: Nil<string>) =>
  acceptLanguageParser.pick([...supportedLocales], locale || defaultLocale) || defaultLocale;

export const resolveLocale = async (request: Request) => {
  const url = new URL(request.url);

  const cookieHeader = request.headers.get("Cookie");
  const userLocale = await localeCookie.parse(cookieHeader);

  const locale =
    acceptLanguageParser.pick(
      [...supportedLocales],
      url.searchParams.get("locale") ||
        userLocale ||
        request.headers.get("accept-language") ||
        defaultLocale,
    ) || defaultLocale;

  return locale;
};

export const getMessages = async (locale: string, namespaces: string[] = []) => {
  const defaultNamespaces = ["common", "footer"];
  const namespacesToLoad = [...namespaces, ...defaultNamespaces];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const messages = new Map<string, any>();

  for (const ns of namespacesToLoad) {
    const stringsPath = path.join(process.cwd(), `./locales/${locale}/${ns}.json`);
    const content = await fs.readFile(stringsPath, { encoding: "utf-8" });
    const obj = JSON.parse(content);

    messages.set(ns, obj);
  }

  return Object.fromEntries(messages);
};

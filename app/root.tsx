import type { LinksFunction, LoaderArgs, MetaFunction, SerializeFrom } from "@remix-run/node";
import type { RouteHandle } from "~/types/common";

import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import clsx from "clsx";
import { Provider as JotaiProvider } from "jotai";
import { IntlProvider } from "use-intl";

import { jotaiStore } from "~/atoms/store";
import { DesktopNavigator, MobileNavigator } from "~/components/navigation";
import { useColorScheme } from "~/hooks/use-color-scheme";
import { getColorScheme } from "~/utils/color-scheme/common.server";
import { getMessages, resolveLocale } from "~/utils/i18n.server";
import { getUser } from "~/utils/session.server";

import rootCss from "~/styles/index.css";
import interCssUrl from "~/styles/inter.css";

export const handle: RouteHandle = {
  id: "root",
};

export const links: LinksFunction = () => {
  return [
    { rel: "preload", href: interCssUrl, as: "style" },
    { rel: "stylesheet", href: interCssUrl },
    { rel: "stylesheet", href: rootCss },
  ];
};

export const meta: MetaFunction<typeof loader | undefined> = ({ data }) => ({
  title: "GENSHIN.ACADEMY",
  "color-scheme": Boolean(data?.colorScheme) ? data?.colorScheme : "dark light",
});

export async function loader({ request }: LoaderArgs) {
  const resolvedLocale = await resolveLocale(request);
  const messages = await getMessages(resolvedLocale, [
    "calc",
    "posts",
    "settings",
    "characters",
    "genshin",
  ]);

  return json({
    colorScheme: await getColorScheme(request),
    user: await getUser(request),
    locale: resolvedLocale,
    messages,
  });
}

export type Loader = SerializeFrom<typeof loader>;

function App({ locale }: { locale: string }) {
  const colorScheme = useColorScheme();

  return (
    <html lang={locale} className={clsx(colorScheme)}>
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width,initial-scale=1" name="viewport" />
        <meta property="og:site_name" content="GENSHIN.ACADEMY" />
        <Meta />
        <Links />
      </head>
      <body className={clsx("h-full", "antialiased")}>
        <div className="app">
          <DesktopNavigator />
          <Outlet />
          <MobileNavigator />
          {/* <Footer /> */}
        </div>

        <Scripts />
        <LiveReload />
        <ScrollRestoration />
      </body>
    </html>
  );
}

export default function Root() {
  const { messages, locale } = useLoaderData<typeof loader>();

  return (
    <IntlProvider locale={locale} messages={messages}>
      <JotaiProvider store={jotaiStore}>
        <App locale={locale} />
      </JotaiProvider>
    </IntlProvider>
  );
}

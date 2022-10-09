import type { LinksFunction, LoaderArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useFetcher,
  useLoaderData,
  useTransition,
} from "@remix-run/react";

import tailwindStylesheetUrl from "~/styles/tailwind.css";
import nprogressStylesheetUrl from "~/styles/nprogress.css";
import { getUser } from "~/utils/session.server";
import { useEffect } from "react";
import { Header } from "~/components/Header";
import type { AbstractIntlMessages } from "use-intl";
import { IntlProvider } from "use-intl";
import { getMessages, resolveLocale } from "~/utils/i18n.server";
import { Footer } from "~/components/Footer";
import Nprogress from "nprogress";
import { Container } from "./components/Container";
import { useOptionalUser } from "./hooks/use-optional-user";

export const links: LinksFunction = () => {
  return [
    { rel: "preload", href: tailwindStylesheetUrl, as: "style" },
    { rel: "stylesheet", href: tailwindStylesheetUrl },
    { rel: "stylesheet", href: nprogressStylesheetUrl },
  ];
};

export const meta: MetaFunction = () => ({
  title: "GENSHIN.ZENLESS",
});

type LoaderData = {
  user: Awaited<ReturnType<typeof getUser>>;
  locale: string;
  messages: Record<string, AbstractIntlMessages>;
};

export async function loader({ request }: LoaderArgs) {
  const resolvedLocale = await resolveLocale(request);
  const messages = await getMessages(resolvedLocale, ["calc", "posts", "settings"]);

  return json<LoaderData>({
    user: await getUser(request),
    locale: resolvedLocale,
    messages,
  });
}

export default function App() {
  const transition = useTransition();
  const { messages, locale } = useLoaderData() as LoaderData;

  useEffect(() => {
    Nprogress.configure({
      showSpinner: false,
    });
  }, []);

  useEffect(() => {
    if (transition.state === "loading" || transition.state === "submitting") {
      Nprogress.start();
    } else {
      Nprogress.done();
    }
  }, [transition.state]);

  return (
    <html lang={locale}>
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width,initial-scale=1" name="viewport" />
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <div className="app">
          <IntlProvider locale={locale} messages={messages}>
            <Header />
            <Outlet />
            <Footer />
          </IntlProvider>
        </div>

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  const maybeUser = useOptionalUser();

  const fetcher = useFetcher();

  const handleLogOut = async () => {
    fetcher.submit(null, {
      action: "/logout",
      method: "patch",
    });
  };

  useEffect(() => {
    Nprogress.done();
  }, []);

  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width,initial-scale=1" name="viewport" />
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <div className="app">
          <Container className="flex flex-wrap items-center justify-center px-2">
            <div className="flex flex-col items-center gap-4">
              <div className="flex text-2xl">
                <h2 className="mr-2 border-r border-black pr-2 font-bold">{caught.status}</h2>
                <p>{caught.statusText}</p>
              </div>

              <div className="flex flex-col items-center justify-center gap-2 md:flex-row ">
                <Link to="/" role="button" className="button w-fit text-center">
                  Go to home page
                </Link>

                {maybeUser && !maybeUser.enabled && (
                  <button onClick={handleLogOut} className="button w-fit text-center">
                    Log Out
                  </button>
                )}
              </div>
            </div>
          </Container>
        </div>

        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

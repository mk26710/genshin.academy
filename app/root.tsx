import type { LinksFunction, LoaderArgs, MetaFunction } from "@remix-run/node";
import type { AbstractIntlMessages } from "use-intl";

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
  useMatches,
  useTransition,
} from "@remix-run/react";
import Nprogress from "nprogress";
import { useEffect } from "react";
import { IntlProvider } from "use-intl";

import { Footer } from "~/components/Footer";
import { Header } from "~/components/Header";
import { getMessages, resolveLocale } from "~/utils/i18n.server";
import { getUser } from "~/utils/session.server";

import { Container } from "./components/Container";

import nprogressStylesheetUrl from "~/styles/nprogress.css";
import tailwindStylesheetUrl from "~/styles/tailwind.css";

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

  const matches = useMatches();

  const matchesHas = (id: string) =>
    matches.some((m) => m.id.toLowerCase().includes(id.toLowerCase()));

  const removeTransitionsRemoverClass = () => {
    if (!document) return;
    if (!document.body) return;

    setTimeout(() => {
      document.body.classList.remove("transitions-be-gone");
      console.log("CSS transitions are enabled again!");
    }, 200);
  };

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

  // this is to prevent the weird layout shift
  // on initial page loads for components with
  // transitions
  useEffect(() => {
    removeTransitionsRemoverClass();
  }, []);

  return (
    <html lang={locale}>
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width,initial-scale=1" name="viewport" />
        <Meta />
        <Links />
      </head>
      <body className="transitions-be-gone h-full">
        <div className="app">
          <IntlProvider locale={locale} messages={messages}>
            <Header />
            <Outlet />
            <Footer />
          </IntlProvider>
        </div>

        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

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
      <body className="transitions-be-gone h-full">
        <div className="app">
          <Container className="flex flex-wrap items-center justify-center px-2">
            <div className="flex flex-col items-center gap-4">
              <div className="flex text-2xl">
                <h2 className="mr-2 border-r border-black pr-2 font-bold">{caught.status}</h2>
                <p>{caught.statusText}</p>
              </div>

              <div className="flex flex-col items-center justify-center gap-2 md:flex-row ">
                {caught?.data?.error?.code == null && (
                  <Link to="/" role="button" className="button w-fit text-center">
                    Go to home page
                  </Link>
                )}

                {caught?.data?.error?.code === "user.disabled" && (
                  <button onClick={handleLogOut} className="button w-fit text-center">
                    Log Out
                  </button>
                )}
              </div>
            </div>
          </Container>
        </div>
      </body>
    </html>
  );
}

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
  useMatches,
  useTransition,
} from "@remix-run/react";
import clsx from "clsx";
import { Provider as JotaiProvider } from "jotai";
import Nprogress from "nprogress";
import { useEffect, useState } from "react";
import { IntlProvider } from "use-intl";

import { Footer } from "~/components/Footer";
import { Header } from "~/components/Header";
import { getMessages, resolveLocale } from "~/utils/i18n.server";
import { getUser } from "~/utils/session.server";

import { Container } from "./components/Container";

import nprogressStylesheetUrl from "~/styles/nprogress.css";

export const handle: RouteHandle = {
  id: "root",
};

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: nprogressStylesheetUrl }];
};

export const meta: MetaFunction = () => ({
  title: "GENSHIN.ZENLESS",
});

export async function loader({ request }: LoaderArgs) {
  const resolvedLocale = await resolveLocale(request);
  const messages = await getMessages(resolvedLocale, ["calc", "posts", "settings"]);

  return json({
    user: await getUser(request),
    locale: resolvedLocale,
    messages,
  });
}

function App({ locale }: { locale: string }) {
  const [cssTransitionsState, setCssTransitionsState] = useState(false);

  const transition = useTransition();

  const matches = useMatches();
  const withScrollRestoration = matches.some(
    (m) => (m.handle as RouteHandle)?.withScrollRestoration === true,
  );

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
    setTimeout(() => {
      setCssTransitionsState(true);
      console.info("CSS transitions are now enabled.");
    }, 1000);
  }, []);

  useEffect(() => {
    console.log({ withScrollRestoration });
  }, [withScrollRestoration]);

  return (
    <html lang={locale}>
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width,initial-scale=1" name="viewport" />
        <Meta />
        <Links />
      </head>
      <body
        className={clsx(
          "h-full",
          "antialiased",
          cssTransitionsState === false && "transitions-be-gone",
        )}
      >
        <div className="app">
          <Header />
          <Outlet />
          <Footer />
        </div>

        {withScrollRestoration === true && <ScrollRestoration />}
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export default function Root() {
  const { messages, locale } = useLoaderData<typeof loader>();

  return (
    <IntlProvider locale={locale} messages={messages}>
      <JotaiProvider>
        <App locale={locale} />
      </JotaiProvider>
    </IntlProvider>
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

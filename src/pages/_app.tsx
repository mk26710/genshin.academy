import type { Session } from "next-auth";
import type { AbstractIntlMessages } from "next-intl";
import type { AppProps } from "next/app";

import { Provider as JotaiProvider } from "jotai";
import { SessionProvider } from "next-auth/react";
import { NextIntlProvider } from "next-intl";
import { ThemeProvider } from "next-themes";
import { useRouter } from "next/router";
import nProgress from "nprogress";
import { useEffect } from "react";

import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";

import "@/assets/styles/cards.scss";
import "@/assets/styles/main.scss";
import "@/assets/styles/markdown.scss";
import "@/assets/styles/nprogress.scss";

const MyApp = ({
  Component,
  pageProps,
}: AppProps<{ messages?: AbstractIntlMessages; session?: Session }>) => {
  const router = useRouter();

  useEffect(() => {
    nProgress.configure({
      showSpinner: false,
      easing: "ease",
      speed: 250,
    });

    console.log("nProgress configured");

    const handleStart = () => {
      nProgress.start();
    };

    const handleStop = () => {
      setTimeout(() => {
        nProgress.done();
      }, 100);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, []);

  return (
    <SessionProvider session={pageProps.session}>
      <NextIntlProvider messages={pageProps.messages}>
        <JotaiProvider>
          <ThemeProvider attribute="class">
            <div className="app-container mx-auto max-w-screen-2xl gap-4 px-2">
              <Navigation />
              <Component {...pageProps} />
              <Footer />
            </div>
          </ThemeProvider>
        </JotaiProvider>
      </NextIntlProvider>
    </SessionProvider>
  );
};

export default MyApp;

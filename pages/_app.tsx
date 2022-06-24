import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { useRouter } from "next/router";
import { useEffectOnce } from "react-use";

import nProgress from "nprogress";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";

import deLocale from "dayjs/locale/de";
import ruLocale from "dayjs/locale/ru";
import jaLocale from "dayjs/locale/ja";

import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

import "@/assets/styles/main.scss";
import "@/assets/styles/cards.scss";
import "@/assets/styles/calculator.scss";
import "@/assets/styles/markdown.scss";
import "@/assets/styles/nprogress.scss";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  useEffectOnce(() => {
    dayjs.extend(localizedFormat);
    dayjs.locale(navigator.language);

    console.log("dayjs extended with localized formats");

    nProgress.configure({
      showSpinner: true,
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
  });

  return (
    <ThemeProvider attribute="class">
      <div className="app-container">
        <Navigation />

        <Component {...pageProps} />

        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default MyApp;

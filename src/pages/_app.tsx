/* eslint-disable @typescript-eslint/no-unused-vars */
import type { AppProps } from "next/app";

import dayjs from "dayjs";
import deLocale from "dayjs/locale/de";
import jaLocale from "dayjs/locale/ja";
import ruLocale from "dayjs/locale/ru";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { Provider as JotaiProvider } from "jotai";
import { useHydrateAtoms } from "jotai/utils";
import { ThemeProvider } from "next-themes";
import { useRouter } from "next/router";
import nProgress from "nprogress";
import { useEffectOnce } from "react-use";

import { initialValues } from "@/atoms/initialValues";

import "@/assets/styles/calculator.scss";
import "@/assets/styles/cards.scss";
import "@/assets/styles/main.scss";
import "@/assets/styles/markdown.scss";
import "@/assets/styles/nprogress.scss";

const MyApp = ({ Component, pageProps }: AppProps) => {
  useHydrateAtoms(initialValues);

  const router = useRouter();

  useEffectOnce(() => {
    dayjs.extend(localizedFormat);
    dayjs.locale(navigator.language);

    console.log("dayjs extended with localized formats");

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
  });

  return (
    <JotaiProvider initialValues={initialValues}>
      <ThemeProvider attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </JotaiProvider>
  );
};

export default MyApp;

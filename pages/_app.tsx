import type { AppProps } from "next/app";
import { useEffect } from "react";

import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import deLocale from "dayjs/locale/de";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ruLocale from "dayjs/locale/ru";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import jaLocale from "dayjs/locale/ja";

import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

import "@/assets/styles/main.scss";
import "@/assets/styles/cards.scss";
import "@/assets/styles/calculator.scss";
import "@/assets/styles/markdown.scss";
import "@/assets/styles/nprogress.scss";

const MyApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    dayjs.extend(localizedFormat);
    dayjs.locale(navigator.language);

    console.log("dayjs extended with localized formats");
  }, []);

  return (
    <div className="app-container">
      <Navigation />

      <Component {...pageProps} />

      <Footer />
    </div>
  );
};

export default MyApp;

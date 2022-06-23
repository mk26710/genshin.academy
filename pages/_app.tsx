import type { AppProps } from "next/app";

import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

import "@/assets/styles/main.scss";
import "@/assets/styles/cards.scss";
import "@/assets/styles/calculator.scss";
import "@/assets/styles/markdown.scss";
import "@/assets/styles/nprogress.scss";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <div className="app-container">
      <Navigation />

      <Component {...pageProps} />

      <Footer />
    </div>
  );
};

export default MyApp;

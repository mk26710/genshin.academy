import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head />
      <body className="antialiased bg-neutral-100 dark:bg-dark-950 dark:text-dark-400">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

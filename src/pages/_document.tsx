import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head />
      <body className="antialiased bg-neutral-100 dark:bg-dark-900 dark:text-neutral-100">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

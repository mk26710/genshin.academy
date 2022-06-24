import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head />
      <body className="antialiased bg-neutral-50 dark:bg-neutral-900 dark:text-neutral-100">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

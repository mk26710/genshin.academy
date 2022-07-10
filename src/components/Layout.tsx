import type { FC, ReactNode } from "react";

import Head from "next/head";
import { Fragment } from "react";

interface Props {
  title?: string;
  titleTemplate?: string;
  description?: string;
  iconURL?: string;
  color?: string;
  children: ReactNode;
}

export const Layout: FC<Props> = ({
  title = "^_^",
  titleTemplate = "GENSHIN.ZENLESS",
  description,
  iconURL,
  color = "#0694fa",
  children,
}) => {
  const realTitle = titleTemplate != null ? `${title} - ${titleTemplate}` : title;

  return (
    <Fragment>
      <Head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content={color} />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="GENSHIN.ZENLESS.CLUB" />
        <meta property="twitter:domain" content="genshin.zenless.club" />

        <title>{realTitle}</title>
        <meta name="title" content={realTitle} />
        <meta property="og:title" content={title} />
        <meta name="twitter:title" content={title} />

        {description && (
          <>
            <meta name="description" content={description} />
            <meta property="og:description" content={description} />
            <meta name="twitter:description" content={description} />
          </>
        )}

        {iconURL && (
          <>
            <meta property="og:image" content={iconURL} />
            <meta name="twitter:image" content={iconURL} />
          </>
        )}

        <meta
          name="keywords"
          content="zenless.club,GENSHIN.ZENLESS.CLUB,Genshin Impact Utilities,Genshin Impact Characters,Genshin Impact Guides"
        />
      </Head>

      <Fragment>{children}</Fragment>
    </Fragment>
  );
};

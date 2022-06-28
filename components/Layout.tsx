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
  title = `^_^`,
  titleTemplate = `GENSHIN.ZENLESS`,
  description,
  iconURL,
  color = `#2563EB`,
  children,
}) => {
  const realTitle = titleTemplate != null ? `${title} - ${titleTemplate}` : title;

  return (
    <Fragment>
      <Head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content={color} />

        <title>{realTitle}</title>
        <meta name="title" content={realTitle} />
        <meta property="og:title" content={realTitle} />

        {description && (
          <Fragment>
            <meta name="description" content={description} />
            <meta property="og:description" content={description} />
          </Fragment>
        )}

        {iconURL && <meta property="og:image" content={iconURL} />}

        <meta
          name="keywords"
          content="zenless.club,GENSHIN.ZENLESS.CLUB,Genshin Impact Utilities,Genshin Impact Characters,Genshin Impact Guides"
        />
      </Head>

      <Fragment>{children}</Fragment>
    </Fragment>
  );
};

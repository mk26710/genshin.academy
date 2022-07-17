import type { LinkProps } from "next/link";
import type { FunctionComponent, ReactNode } from "react";

import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";

interface Props extends LinkProps {
  children: ReactNode;
  skipLocaleHandling?: boolean;
}

const Link: FunctionComponent<Props> = ({ children, skipLocaleHandling, href, ...rest }) => {
  const router = useRouter();
  const locale = rest.locale || router.query.locale || "";

  let realHref = href || router.asPath;
  if (`${realHref}`.indexOf("http") === 0) skipLocaleHandling = true;
  if (locale && !skipLocaleHandling) {
    realHref = realHref
      ? `/${locale}${realHref}`
      : router.pathname.replace("[locale]", `${locale}`);
  }

  return (
    <>
      <NextLink href={realHref} {...rest}>
        {children}
      </NextLink>
    </>
  );
};

export default Link;

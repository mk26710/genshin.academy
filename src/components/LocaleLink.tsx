import type { LinkProps } from "next/link";
import type { FunctionComponent, ReactNode } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

type LocaleLinkProps = LinkProps & {
  children: ReactNode;
  skipLocaleHandling?: boolean;
};

const LocaleLink: FunctionComponent<LocaleLinkProps> = ({
  children,
  skipLocaleHandling,
  href,
  ...rest
}) => {
  const router = useRouter();
  const locale = rest.locale || router.query.locale || "";

  let realHref = href || router.asPath;
  if (realHref.toString().indexOf("http") === 0) skipLocaleHandling = true;
  if (locale && !skipLocaleHandling) {
    realHref = realHref
      ? `/${locale}${realHref}`
      : router.pathname.replace("[locale]", locale.toString());
  }

  return (
    <>
      <Link href={realHref} {...rest}>
        {children}
      </Link>
    </>
  );
};

export default LocaleLink;

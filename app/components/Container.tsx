import type { ReactNode } from "react";

import { ScrollRestoration } from "@remix-run/react";
import { Fragment } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  withScrollRestoration?: boolean;
  verticalCenter?: boolean;
}

export const Container = ({ className = "", withScrollRestoration = false, children }: Props) => {
  if (withScrollRestoration === true) {
    return (
      <Fragment>
        <ScrollRestoration />
        <main className={`main ${className}`}>{children}</main>
      </Fragment>
    );
  }

  return <main className={`main ${className}`}>{children}</main>;
};

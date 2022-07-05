import type { FunctionComponent, ReactNode } from "react";

import { Fragment, useEffect, useState } from "react";

interface Props {
  children: ReactNode;
}

/** Very useful article https://www.joshwcomeau.com/react/the-perils-of-rehydration/#abstractions */
export const ClientOnly: FunctionComponent<Props> = ({ children, ...delegated }) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <Fragment {...delegated}>{children}</Fragment>;
};

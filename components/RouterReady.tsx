import { FC, Fragment, ReactNode } from "react";

import { useRouterReady } from "@/hooks/useRouterReady";

interface Props {
  children: ReactNode;
}

export const RouterReady: FC<Props> = ({ children }) => {
  const ready = useRouterReady();

  if (!ready) {
    return null;
  }

  return <Fragment>{children}</Fragment>;
};

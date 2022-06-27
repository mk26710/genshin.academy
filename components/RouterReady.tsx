import { useRouter } from "next/router";
import { FC, Fragment, ReactNode, useEffect, useState } from "react";

interface Props {
  children: ReactNode;
}

export const RouterReady: FC<Props> = ({ children }) => {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (router.isReady) {
      setReady(true);
    }
  }, [router.isReady]);

  if (!ready) {
    return null;
  }

  return <Fragment>{children}</Fragment>;
};

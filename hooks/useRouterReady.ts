import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const useRouterReady = () => {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (router.isReady) {
      setReady(true);
    }
  }, [router.isReady]);

  return ready;
};

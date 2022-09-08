import { useRouter } from "next/router";

export const useCurrentLocale = () => {
  const router = useRouter();
  return router.locale ?? "en";
};

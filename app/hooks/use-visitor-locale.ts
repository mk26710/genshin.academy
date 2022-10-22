import { defaultLocale } from "~/utils/locales";

import { useMatchesData } from "./use-matches-data";

export const useVisitorLocale = () => {
  const data = useMatchesData("root");
  if (!data || typeof data.locale !== "string") {
    return defaultLocale;
  }
  return data.locale;
};

import { useMatchesData } from "./use-matches-data";

export const useVisitorLocale = () => {
  const data = useMatchesData("root");
  if (!data || typeof data.locale !== "string") {
    return undefined;
  }
  return data.locale;
};

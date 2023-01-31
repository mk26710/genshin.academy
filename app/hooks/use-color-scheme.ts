import type { Loader as RootLoader } from "~/root";

import { useMatchesData } from "./use-matches-data";

type ColorScheme = RootLoader["colorScheme"];

export const useColorScheme = (): ColorScheme | undefined => {
  const data = useMatchesData("root");

  if (data != null && typeof data.colorScheme === "string") {
    const cs = data.colorScheme;

    if (cs === "light" || cs === "dark" || cs === null) {
      return cs;
    }
  }

  return undefined;
};

import type { ColorScheme } from "~/utils/color-scheme/common";

import { atom } from "jotai";

import { isColorScheme } from "~/utils/color-scheme/common";

export const rawColorSchemeAtom = atom<ColorScheme | null | undefined>(undefined);

export const colorSchemeAtom = atom(
  (get) => get(rawColorSchemeAtom),
  (_get, set, value: string) => {
    if (!isColorScheme(value)) {
      throw TypeError("Invalid color scheme value");
    }

    set(rawColorSchemeAtom, value);
  },
);

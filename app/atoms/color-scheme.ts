import type { ColorScheme } from "~/utils/color-scheme/common";

import { atom } from "jotai";

export const colorSchemeAtom = atom<ColorScheme | null | undefined>(undefined);

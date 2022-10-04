import type { Atom } from "jotai";

import { critDamageAtom, critDamageInit, critRateAtom, critRateInit } from "./calculator";
import { characterSearchAtom, characterSearchInit } from "./characterSearch";

export const initialValues: Iterable<readonly [Atom<unknown>, unknown]> = [
  [critRateAtom, critRateInit],
  [critDamageAtom, critDamageInit],
  [characterSearchAtom, characterSearchInit],
];

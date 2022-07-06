import { useHydrateAtoms } from "jotai/utils";

import { critDamageAtom, critDamageInit, critRateAtom, critRateInit } from "@/atoms/calculator";

export const useHydrateAllAtoms = () => {
  useHydrateAtoms([
    [critRateAtom, critRateInit],
    [critDamageAtom, critDamageInit],
  ]);
};

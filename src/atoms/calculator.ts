import { atom } from "jotai";

/** Crit value calculator atoms */

export const critRateInit = NaN;
export const critRateAtom = atom<number>(critRateInit);

export const critDamageInit = NaN;
export const critDamageAtom = atom<number>(critDamageInit);

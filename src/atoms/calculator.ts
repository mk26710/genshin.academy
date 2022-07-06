import { atom } from "jotai";

export const critRateInit = NaN;
export const critRateAtom = atom<number>(critRateInit);

export const critDamageInit = NaN;
export const critDamageAtom = atom<number>(critDamageInit);

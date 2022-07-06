import { atom } from "jotai";

/** Crit value calculator atoms */

export const critRateInit = NaN;
export const critRateAtom = atom<number>(critRateInit);

export const critDamageInit = NaN;
export const critDamageAtom = atom<number>(critDamageInit);

/** Resin calculator atoms */

export const resinCurrentInit = NaN;
export const resinCurrentAtom = atom<number>(resinCurrentInit);

export const resinNeededInit = NaN;
export const resinNeededAtom = atom<number>(resinCurrentInit);

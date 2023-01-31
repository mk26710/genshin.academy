import { atom } from "jotai";

/** Crit value calculator atoms */

export const critRateAtom = atom<number>(NaN);
export const critDamageAtom = atom<number>(NaN);
export const critValueAtom = atom((get) => get(critDamageAtom) + get(critRateAtom) * 2);

/** Resin calculator atoms */

export const resinCurrentAtom = atom<number>(NaN);
export const resinNeededAtom = atom<number>(NaN);

export const resinTimeDeltaAtom = atom((get) => (get(resinNeededAtom) - get(resinCurrentAtom)) * 8);
export const resinReplenishTimeAtom = atom((get) => {
  const now = new Date();
  return new Date(now.setMinutes(now.getMinutes() + get(resinTimeDeltaAtom)));
});

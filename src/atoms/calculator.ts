import dayjs from "dayjs";
import { atom } from "jotai";

/** Crit value calculator atoms */

export const critRateInit = NaN;
export const critRateAtom = atom<number>(critRateInit);

export const critDamageInit = NaN;
export const critDamageAtom = atom<number>(critDamageInit);

export const critValueAtom = atom((get) =>
  (get(critDamageAtom) + get(critRateAtom) * 2).toFixed(2),
);

/** Resin calculator atoms */

export const resinCurrentInit = NaN;
export const resinCurrentAtom = atom<number>(resinCurrentInit);

export const resinNeededInit = NaN;
export const resinNeededAtom = atom<number>(resinCurrentInit);

export const resinTimeDeltaAtom = atom((get) => (get(resinNeededAtom) - get(resinCurrentAtom)) * 8);
export const resinReplenishTimeAtom = atom((get) =>
  dayjs().add(get(resinTimeDeltaAtom), "minutes"),
);

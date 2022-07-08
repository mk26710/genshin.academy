import { z } from "zod";

export const Rarity = z.union([
  z.literal(5),
  z.literal(4),
  z.literal(3),
  z.literal(2),
  z.literal(1),
]);
export type RarityType = z.infer<typeof Rarity>;

export const Weapon = z.union([
  z.literal(`SWORD`),
  z.literal(`CLAYMORE`),
  z.literal(`POLEARM`),
  z.literal(`CATALYST`),
  z.literal(`BOW`),
]);
export type WeaponType = z.infer<typeof Weapon>;

export const Elements = z.union([
  z.literal(`CRYO`),
  z.literal(`ELECTRO`),
  z.literal(`PYRO`),
  z.literal(`ANEMO`),
  z.literal(`HYDRO`),
  z.literal(`GEO`),
]);
export type ElementsType = z.infer<typeof Elements>;

export const Region = z.union([
  z.literal(`MONDSTADT`),
  z.literal(`LIYUE`),
  z.literal(`INAZUMA`),
  z.literal(`SUMERU`),
]);
export type RegionType = z.infer<typeof Region>;

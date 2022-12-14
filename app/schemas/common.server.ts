import { Association, Element, Weapon } from "@prisma/client";

import { z } from "~/lib/zod.server";

export const HexColorSchema = z
  .string()
  .length(7)
  .regex(/#[abcdef\d]+/i, "Color must be represented as HEX. i.e. #ff0000");

export const RaritySchema = z.coerce.number().positive().max(5);

export const ElementSchema = z
  .string()
  .trim()
  .transform((s) => s.toUpperCase())
  .pipe(z.custom<Element>((s) => typeof s === "string" && s in Element));

export const WeaponShema = z
  .string()
  .trim()
  .transform((s) => s.toUpperCase())
  .pipe(z.custom<Weapon>((s) => typeof s === "string" && s in Weapon));

export const AssociationSchema = z
  .string()
  .trim()
  .transform((s) => s.toUpperCase())
  .pipe(z.custom<Association>((s) => typeof s === "string" && s in Association));

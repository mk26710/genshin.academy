import { Association, Element as GenshinElement, Weapon } from "@prisma/client";

import { z } from "~/lib/zod.server";
import {
  AssociationSchema,
  ElementSchema,
  HexColorSchema,
  RaritySchema,
  WeaponShema,
} from "~/schemas/common.server";
import { isObjectValue, isString } from "~/utils/helpers";

export const CharacterIdSchema = z.coerce
  .string()
  .transform((s) => s.toLowerCase())
  .pipe(
    z
      .string()
      .trim()
      .regex(/^[a-z-_]+$/i, "ID must contain only latin characters, - or _"),
  );

export const CharacterSchema = z.object({
  id: CharacterIdSchema,
  accentColor: HexColorSchema.transform((s) => s.substring(1))
    .transform((s) => parseInt(s, 16))
    .pipe(z.number().positive().max(16_777_215)),
  birthDay: z.coerce.number().min(1).max(31).nullable(),
  birthMonth: z.coerce.number().min(1).max(12).nullable(),
  rarity: RaritySchema,
  association: AssociationSchema.nullable(),
  element: ElementSchema.nullable(),
  hasVision: z.coerce.boolean().nullable(),
  weapon: WeaponShema,
});

export const CharacterInfoSchema = z.object({
  entryLanguage: z
    .string()
    .length(2)
    .transform((s) => s.toLowerCase()),
  characterId: CharacterIdSchema,
  name: z.string(),
  title: z.string().nullable(),
  description: z.string().nullable(),
});

export const characterMetaFormSchema = z.object({
  id: z
    .string()
    .trim()
    .transform((s) => s.toLowerCase().replaceAll(/\s+/gi, "-")),
  accentColor: z
    .string()
    .trim()
    .regex(/^#[0-9A-F]{6}$/gi, "Invalid color value"),
  rarity: z
    .string()
    .trim()
    .transform((s) => parseInt(s))
    .pipe(z.number().int().min(4).max(5)),
  element: z
    .custom<GenshinElement>((data) => isString(data) && isObjectValue(data, GenshinElement))
    .nullish(),
  weapon: z
    .string()
    .trim()
    .pipe(z.custom<Weapon>((data) => isString(data) && isObjectValue(data, Weapon)))
    .nullish(),
  hasVision: z.coerce.boolean().nullish(),
  isArchon: z.coerce.boolean().nullish(),
  association: z
    .string()
    .trim()
    .pipe(z.custom<Association>((data) => isObjectValue(data, Association)))
    .nullish(),
  birthDate: z.coerce.date().nullish(),
  releaseDate: z.coerce.date(),
  versionReleased: z
    .string()
    .trim()
    .regex(/^(\d{1,2}\.\d{1,2})(\.\d{1,2})?$/gi, "Invalid genshin release version"),
});

export type CharacterMetaForm = z.infer<typeof characterMetaFormSchema>;

import { Association, Element as GenshinElement, Weapon } from "@prisma/client";
import { z } from "zod";

import { isObjectValue, isString } from "~/utils/helpers";

export const CharacterMetaFormSchema = z.object({
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
  birthDay: z.coerce.number().min(1).max(31),
  birthMonth: z.coerce.number().min(1).max(12),
  releaseDate: z.coerce.date(),
  versionReleased: z
    .string()
    .trim()
    .regex(/^(\d{1,2}\.\d{1,2})(\.\d{1,2})?$/gi, "Invalid genshin release version"),
});

export type CharacterMetaForm = z.infer<typeof CharacterMetaFormSchema>;

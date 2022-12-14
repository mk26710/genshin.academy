import { z } from "~/lib/zod.server";
import {
  AssociationSchema,
  ElementSchema,
  HexColorSchema,
  RaritySchema,
  WeaponShema,
} from "~/schemas/common.server";

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

import { z } from "zod";
import type { Component } from "vue";

import { Rarity, Vision, Weapon } from "@/data/types/genshin";
import { deepFreezeTranformer } from "@/lib/utils";

export const BirthdayDate = z.tuple([
  z.number().int().min(1).max(31),
  z.number().int().min(1).max(12),
]);

export type BirthdayDate = z.infer<typeof BirthdayDate>;

export const Constellation = z.object({
  level: z.number().min(1).max(6),
  title: z.string(),
  description: z.string(),
  icon: z.union([z.custom<Component>(), z.string()]).optional(),
});

export type Constellation = z.infer<typeof Constellation>;

export const StoryEntry = z.object({
  title: z.string(),
  description: z.string(),
});

export type StoryEntry = z.infer<typeof StoryEntry>;

export const Character = z
  .object({
    /** Name of the character that is used for filenames, paths etc. rlated to the character */
    id: z.string().regex(/[a-z_]+/g),

    /** Human readable name of the character */
    name: z.string(),

    /** Official description of the character from the game */
    description: z.string(),

    /** An array of data related to constellations */
    constellations: z.tuple([
      Constellation,
      Constellation,
      Constellation,
      Constellation,
      Constellation,
      Constellation,
    ]),

    /** Storylines from the game (character -> profile -> story) */
    story: StoryEntry.array(),

    rarity: z.nativeEnum(Rarity),
    weapon: z.nativeEnum(Weapon),
    vision: z.nativeEnum(Vision),
    birthday: BirthdayDate,
  })
  .transform(deepFreezeTranformer);

export type Character = z.infer<typeof Character>;

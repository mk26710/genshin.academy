import type { Component } from "react";

import { z } from "zod";

import { Region, Elements, Weapon, Rarity } from "./genshin.schema";

export const BirthdayDate = z.tuple([
  z.number().int().min(1).max(31),
  z.number().int().min(1).max(12),
]);

export type BirthdayDateType = z.infer<typeof BirthdayDate>;

export const Constellation = z
  .object({
    level: z.number().min(1).max(6),
    title: z.string(),
    description: z.string(),
    icon: z.union([z.custom<Component>(), z.string()]).optional(),
  })
  .strict();

export type ConstellationType = z.infer<typeof Constellation>;

export const StoryEntry = z
  .object({
    title: z.string(),
    description: z.string(),
  })
  .strict();

export type StoryEntryType = z.infer<typeof StoryEntry>;

export const Character = z
  .object({
    id: z.string().regex(/[a-z_]+/g),
    accentColor: z.string().regex(/#([0-9a-f]{6}|[0-9a-f]{3})/gi),

    name: z.string(),
    description: z.string(),
    region: Region.optional(),
    birthday: BirthdayDate,

    rarity: Rarity,
    vision: Elements,
    weapon: Weapon,

    constellations: z.tuple([
      Constellation,
      Constellation,
      Constellation,
      Constellation,
      Constellation,
      Constellation,
    ]),
    story: StoryEntry.array().optional(),
  })
  .strict();

export type CharacterType = z.infer<typeof Character>;

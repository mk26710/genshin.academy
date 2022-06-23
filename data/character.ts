import { z } from "zod";
import type { Component } from "react";

import { Rarity, Vision, Weapon } from "@/data/types/genshin";
import { freezeTransform } from "@/lib/utils";

export const BirthdayDate = z
  .tuple([z.number().int().min(1).max(31), z.number().int().min(1).max(12)])
  .transform(freezeTransform);

export type BirthdayDate = z.infer<typeof BirthdayDate>;

export const Constellation = z
  .object({
    level: z.number().min(1).max(6),
    title: z.string(),
    description: z.string(),
    icon: z.union([z.custom<Component>(), z.string()]).optional(),
  })
  .transform(freezeTransform);

export type Constellation = z.infer<typeof Constellation>;

export const StoryEntry = z
  .object({
    title: z.string(),
    description: z.string(),
  })
  .transform(freezeTransform);

export type StoryEntry = z.infer<typeof StoryEntry>;

export const Character = z
  .object({
    id: z.string().regex(/[a-z_]+/g),
    name: z.string(),
    description: z.string(),
    birthday: BirthdayDate,
    constellations: z.tuple([
      Constellation,
      Constellation,
      Constellation,
      Constellation,
      Constellation,
      Constellation,
    ]),
    story: StoryEntry.array(),
    rarity: z.nativeEnum(Rarity),
    weapon: z.nativeEnum(Weapon),
    vision: z.nativeEnum(Vision),
  })
  .transform(freezeTransform);

export type Character = z.infer<typeof Character>;

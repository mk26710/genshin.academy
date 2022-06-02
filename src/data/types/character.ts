import type { Component } from "vue";

import type { Rarity, Vision, WeaponType } from "@/data/types/genshin";

/**
 * Represents day and month of character's birthday
 */
export type BirthdayDate = [number, number];

export interface Constellation {
  level: number;
  title: string;
  description: string;
  icon?: string | Component;
}

export interface StoryEntry {
  title: string;
  requirement: string;
  content: string;
}

/**
 * Representation of common character properties
 */
export interface Character {
  /** Name of the character that is used for filenames, paths etc. rlated to the character */
  id: string;

  /** Human readable name of the character */
  name: string;

  /** Official description of the character from the game */
  description: string;

  /** An array of data related to constellations */
  constellations: Constellation[];

  /** Storylines from the game (character -> profile -> story) */
  story: StoryEntry[];

  rarity: Rarity;
  weapon: WeaponType;
  vision: Vision;
  birthday: BirthdayDate;
}

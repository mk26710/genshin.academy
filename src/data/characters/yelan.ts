import type { BirthdayDate, Character, Constellation, StoryEntry } from "@/data/types/character";
import { Rarity, Vision, WeaponType } from "@/data/types/genshin";

const id = "yelan";

const name = "Yelan";
const description = `A mysterious person who claims to work for the Ministry of Civil Affairs, but is a "non-entity" on the Ministry of Civil Affairs' list.`;
const birthday: BirthdayDate = [20, 4];

const rarity = Rarity.FIVE_STAR;

const vision = Vision.HYDRO;
const weapon = WeaponType.BOW;

const constellations: Array<Constellation> = [];

const story: Array<StoryEntry> = [];

export default {
  id,
  name,
  description,
  birthday,
  rarity,
  vision,
  weapon,
  constellations,
  story,
} as Character;

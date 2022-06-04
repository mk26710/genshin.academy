import type { BirthdayDate, Character, Constellation, StoryEntry } from "@/data/types/character";
import { Rarity, Vision, WeaponType } from "@/data/types/genshin";

const id = "kamisato_ayaka";
const name = "Kamisato Ayaka";

const description = `Daughter of the Yashiro Commission's Kamisato Clan from Inazuma. Dignified and elegant, wise and determined. Sincere and pleasant to others. Universally loved by the Inazuma people, she has earned the title of Shirasagi Himegimi.`;

const birthday: BirthdayDate = [28, 9];

const rarity = Rarity.FIVE_STAR;
const vision = Vision.CRYO;
const weapon = WeaponType.SWORD;

const constellations: Constellation[] = [];

const story: StoryEntry[] = [];

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

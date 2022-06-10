import type { Character } from "@/data/types/character";
import { Rarity, Vision, Weapon } from "@/data/types/genshin";

const kamisato_ayaka: Character = {
  id: "kamisato_ayaka",

  name: "Kamisato Ayaka",
  description: `Daughter of the Yashiro Commission's Kamisato Clan from Inazuma. Dignified and elegant, wise and determined. Sincere and pleasant to others. Universally loved by the Inazuma people, she has earned the title of Shirasagi Himegimi.`,
  birthday: [28, 9],

  rarity: Rarity.FIVE_STAR,
  vision: Vision.CRYO,
  weapon: Weapon.SWORD,

  constellations: [],

  story: [],
};

export default kamisato_ayaka;

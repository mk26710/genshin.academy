import type { Character } from "@/data/types/character";
import { Rarity, Vision, Weapon } from "@/data/types/genshin";

const eula: Character = {
  id: "eula",

  name: "Eula",
  description: `The Spindrift Knight, a scion of the old aristocracy, and the Captain of the Knights of Favonius Reconnaissance Company. The reason for which a descendant of the ancient nobles might join the Knights remains a great mystery in Mondstadt to this very day.`,
  birthday: [25, 10],

  rarity: Rarity.FIVE_STAR,

  vision: Vision.CRYO,
  weapon: Weapon.CLAYMORE,

  constellations: [],

  story: [],
};

export default eula;

import { Character } from "@/data/character";
import { Rarity, Vision, Weapon } from "../types/genshin";

const qiqi = Character.parse({
  id: "qiqi",

  name: "Qiqi",
  description: `An apprentice and herb gatherer at Bubu Pharmacy. An undead with a bone-white complexion, she seldom has much in the way of words or emotion.`,
  birthday: [3, 3],

  rarity: Rarity.FIVE_STAR,

  vision: Vision.CRYO,
  weapon: Weapon.SWORD,

  constellations: [
    {
      level: 1,
      title: "Ascetics of Frost",
      description: `When the Herald of Frost hits an opponent marked by a Fortune-Preserving Talisman, Qiqi regenerates 2 Energy.`,
    },
    {
      level: 2,
      title: "Frozen to the Bone",
      description: `Qiqi's Normal and Charge Attack DMG against opponents affected by Cryo is increased by 15%.`,
    },
    {
      level: 3,
      title: "Ascendant Praise",
      description: `Increases the Level of Adeptus Art: Preserver of Fortune by 3. Maximum upgrade level is 15.`,
    },
    {
      level: 4,
      title: "Divine Suppression",
      description: `Targets marked by the Fortune-Preserving Talisman have their ATK decreased by 20%.`,
    },
    {
      level: 5,
      title: "Crimson Lotus Bloom",
      description: `Increases the Level of Adeptus Art: Herald of Frost by 3. Maximum upgrade level is 15.`,
    },
    {
      level: 6,
      title: "Rite of Resurrection",
      description: `Using Adeptus Art: Preserver of Fortune revives all fallen party members nearby and regenerates 50% of their HP. This effect can only occur once every 15 mins.`,
    },
  ],

  story: [],
});

export default qiqi;

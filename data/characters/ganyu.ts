import { Character } from "@/data/character";
import { Rarity, Vision, Weapon } from "@/data/types/genshin";

const ganyu: Character = {
  id: `ganyu`,
  accentColor: `#d4e2f2`,

  name: `Ganyu`,
  description: `The secretary at Yuehai Pavilion. The blood of the qilin, an illuminated beast, flows within her veins.`,
  birthday: [12, 2],

  rarity: Rarity.FIVE_STAR,

  vision: Vision.CRYO,
  weapon: Weapon.BOW,

  constellations: [
    {
      level: 1,
      title: `Dew-Drinker`,
      description: `Charge Level 2 Frostflake Arrows or Frostflake Arrow Blooms decrease opponents' Cryo RES by 15% for 6s upon hit. A hit also regenerates 2 Energy for Ganyu. This effect can only occur once per Charge Level 2 Frostflake Arrow, regardless if Frostflake Arrow itself or its Bloom hits the target.`,
    },
    {
      level: 2,
      title: `The Auspicious`,
      description: `Trail of the Qilin gains 1 additional charge.`,
    },
    {
      level: 3,
      title: `Cloud-Strider`,
      description: `Increases the Level of Celestial Shower by 3. Maximum upgrade level is 15.`,
    },
    {
      level: 4,
      title: `Westward Sojourn`,
      description: `Opponents standing within the AoE of Celestial Shower take increased DMG. This effect strengthens over time. Increased DMG taken begins at 5% and increases by 5% every 3s, up to a maximum of 25%. The effect lingers for 3s after the opponent leaves the AoE.`,
    },
    {
      level: 5,
      title: `The Merciful`,
      description: `Increases the Level of Trail of the Qilin by 3. Maximum upgrade level is 15.`,
    },
    {
      level: 6,
      title: `The Clement`,
      description: `Using Trail of the Qilin causes the next Frostflake Arrow shot within 30s to not require charging.`,
    },
  ],

  story: [],
};

export default Character.parse(ganyu);

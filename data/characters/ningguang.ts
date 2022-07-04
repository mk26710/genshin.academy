import type { CharacterType } from "../character";

import { Character } from "../character";
import { Rarity, Vision, Weapon } from "../types/genshin";

const ningguang: CharacterType = {
  id: `ningguang`,
  accentColor: `#f96f3e`,

  name: `Ningguang`,
  description: `The Tianquan of the Liyue Qixing. Her wealth is unsurpassed in all of Teyvat.`,
  birthday: [26, 8],

  rarity: Rarity.FOUR_STAR,
  vision: Vision.GEO,
  weapon: Weapon.CATALYST,

  constellations: [
    {
      level: 1,
      title: `Piercing Fragments`,
      description: `When a Normal Attack hits, it deals AoE DMG.`,
    },
    {
      level: 2,
      title: `Shock Effect`,
      description: `When Jade Screen is shattered, its CD will reset.\nCan occur once every 6s.`,
    },
    {
      level: 3,
      title: `Majesty be the Array of Stars`,
      description: `Increases the Level of Starshatter by 3.\nMaximum upgrade level is 15.`,
    },
    {
      level: 4,
      title: `Exquisite be the Jade, Outshining All Beneath`,
      description: `Jade Screen increases nearby characters' Elemental RES by 10%.`,
    },
    {
      level: 5,
      title: `Invincible be the Jade Screen`,
      description: `Increases the Level of Jade Screen by 3.\nMaximum upgrade level is 15.`,
    },
    {
      level: 6,
      title: `Grandeur be the Seven Stars`,
      description: `When Starshatter is used, Ningguang gains 7 Star Jades.`,
    },
  ],

  story: [],
};

export default Character.parse(ningguang);

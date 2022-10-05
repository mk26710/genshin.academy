import type { CharacterType } from "../character.schema";

import { Character } from "../character.schema";

const razor: CharacterType = {
  id: "razor",
  accentColor: "#E0514E",

  name: "Razor",
  description:
    "A boy who lives among the wolves in Wolvendom of Mondstadt, away from human civilization. As agile as lightning.",
  birthday: [9, 9],

  rarity: 4,
  vision: "ELECTRO",
  weapon: "CLAYMORE",

  constellations: [
    {
      level: 1,
      title: "Wolf's Instinct",
      description: "Picking up an Elemental Orb or Particle increases Razor's DMG by 10% for 8s.",
    },
    {
      level: 2,
      title: "Suppression",
      description: "Increases CRIT Rate against opponents with less than 30% HP by 10%.",
    },
    {
      level: 3,
      title: "Soul Companion",
      description: "Increases the Level of Lightning Fang by 3.\nMaximum upgrade level is 15.",
    },
    {
      level: 4,
      title: "Bite",
      description:
        "When casting Claw and Thunder ({LAYOUT_MOBILE#Tap}{LAYOUT_PC#Press}{LAYOUT_PS#Press}), opponents hit will have their DEF decreased by 15% for 7s.",
    },
    {
      level: 5,
      title: "Sharpened Claws",
      description: "Increases the Level of Claw and Thunder by 3.\nMaximum upgrade level is 15.",
    },
    {
      level: 6,
      title: "Lupus Fulguris",
      description:
        "Every 10s, Razor's sword charges up, causing the next Normal Attack to release lightning that deals 100% of Razor's ATK as Electro DMG.\nWhen Razor is not using Lightning Fang, a lightning strike on an opponent will grant Razor an Electro Sigil for Claw and Thunder.",
    },
  ],

  story: [],
};

export default Character.parse(razor);

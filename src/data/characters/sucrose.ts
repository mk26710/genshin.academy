import type { CharacterType } from "../character";

import { Character } from "../character";

const sucrose: CharacterType = {
  id: "sucrose",
  accentColor: "#DDEFD4",

  name: "Sucrose",
  description: "An alchemist filled with curiosity about all things. She researches bio-alchemy.",
  birthday: [26, 11],

  rarity: 4,
  vision: "ANEMO",
  weapon: "CATALYST",

  constellations: [
    {
      level: 1,
      title: "Clustered Vacuum Field",
      description: "Astable Anemohypostasis Creation - 6308 gains 1 additional charge.",
    },
    {
      level: 2,
      title: "Beth: Unbound Form",
      description: "The duration of Forbidden Creation - Isomer 75 / Type II is increased by 2s.",
    },
    {
      level: 3,
      title: "Flawless Alchemistress",
      description:
        "Increases the Level of Astable Anemohypostasis Creation - 6308 by 3.\nMaximum upgrade level is 15.",
    },
    {
      level: 4,
      title: "Alchemania",
      description:
        "Sucrose will reduce the CD of Astable Anemohypostasis Creation - 6308 by 1-7s for every 7 Normal or Charged Attack hits she scores against opponents.\nOne hit may be counted every 0.1s.",
    },
    {
      level: 5,
      title: "Caution: Standard Flask",
      description:
        "Increases the Level of Forbidden Creation - Isomer 75 / Type II by 3.\nMaximum upgrade level is 15.",
    },
    {
      level: 6,
      title: "Chaotic Entropy",
      description:
        "If Forbidden Creation - Isomer 75 / Type II triggers an Elemental Absorption, all party members gain a 20% Elemental DMG Bonus for the corresponding absorbed element during its duration.",
    },
  ],

  story: [],
};

export default Character.parse(sucrose);

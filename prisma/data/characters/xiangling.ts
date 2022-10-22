import type { CharacterType } from "../character.schema";

import { Character } from "../character.schema";

const xiangling: CharacterType = {
  id: "xiangling",
  accentColor: "#d5634c",

  name: "Xiangling",
  description:
    "A renowned chef from Liyue. She's extremely passionate about cooking and excels at making her signature hot and spicy dishes.",
  birthday: [2, 11],

  rarity: 4,
  vision: "PYRO",
  weapon: "POLEARM",

  constellations: [
    {
      level: 1,
      title: "Crispy Outside, Tender Inside",
      description: "Opponents hit by Guoba's attacks have their Pyro RES reduced by 15% for 6s.",
    },
    {
      level: 2,
      title: "Oil Meets Fire",
      description:
        "The last attack in a Normal Attack sequence applies the Implode status onto the opponent for 2s. An explosion will occur once this duration ends, dealing 75% of Xiangling's ATK as AoE Pyro DMG.",
    },
    {
      level: 3,
      title: "Deepfry",
      description: "Increases the Level of Pyronado by 3.\nMaximum upgrade level is 15.",
    },
    {
      level: 4,
      title: "Slowbake",
      description: "Pyronado's duration is increased by 40%.",
    },
    {
      level: 5,
      title: "Guoba Mad",
      description: "Increases the Level of Guoba Attack by 3.\nMaximum upgrade level is 15.",
    },
    {
      level: 6,
      title: "Condensed Pyronado",
      description: "For the duration of Pyronado, all party members receive a 15% Pyro DMG Bonus.",
    },
  ],

  story: [],
};

export default Character.parse(xiangling);

import type { CharacterType } from "../character";

import { Character } from "../character";

const xiao: CharacterType = {
  id: "xiao",
  accentColor: "#61babe",

  name: "Xiao",
  description:
    'A yaksha adeptus who defends Liyue. Also heralded as the "Conqueror of Demons" and "Vigilant Yaksha."',
  birthday: [17, 4],

  rarity: 5,
  vision: "ANEMO",
  weapon: "POLEARM",

  constellations: [
    {
      level: 1,
      title: "Dissolution Eon: Destroyer of Worlds",
      description: "Increases Lemniscatic Wind Cycling's charges by 1.",
    },
    {
      level: 2,
      title: "Annihilation Eon: Blossom of Kaleidos",
      description:
        "When in the party and not on the field, Xiao's Energy Recharge is increased by 25%.",
    },
    {
      level: 3,
      title: "Conqueror of Evil: Wrath Deity",
      description:
        "Increases the Level of Lemniscatic Wind Cycling by 3.\nMaximum upgrade level is 15.",
    },
    {
      level: 4,
      title: "Transcension: Extinction of Suffering",
      description: "When Xiao's HP falls below 50%, he gains a 100% DEF Bonus.",
    },
    {
      level: 5,
      title: "Evolution Eon: Origin of Ignorance",
      description: "Increases the Level of Bane of All Evil by 3.\nMaximum upgrade level is 15.",
    },
    {
      level: 6,
      title: "Conqueror of Evil: Guardian Yaksha",
      description:
        "While under the effects of Bane of All Evil, hitting at least 2 opponents with Xiao's Plunging Attack will immediately grant him 1 charge of Lemniscatic Wind Cycling, and for the next 1s, he may use Lemniscatic Wind Cycling while ignoring its CD.",
    },
  ],

  story: [],
};

export default Character.parse(xiao);

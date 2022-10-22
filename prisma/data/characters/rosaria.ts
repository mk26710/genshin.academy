import type { CharacterType } from "../character.schema";

import { Character } from "../character.schema";

const rosaria: CharacterType = {
  id: "rosaria",
  accentColor: "#894167",

  name: "Rosaria",
  description:
    "A sister of the church, though you wouldn't know it if it weren't for her attire. Known for her sharp, cold words and manner, she often works alone.",
  birthday: [24, 1],

  rarity: 4,
  vision: "CRYO",
  weapon: "POLEARM",

  constellations: [
    {
      level: 1,
      title: "Unholy Revelation",
      description:
        "When Rosaria deals a CRIT Hit, her ATK SPD increases by 10% and her Normal Attack DMG increases by 10% for 4s.",
    },
    {
      level: 2,
      title: "Land Without Promise",
      description:
        "The duration of the Ice Lance created by Rites of Termination is increased by 4s.",
    },
    {
      level: 3,
      title: "The Wages of Sin",
      description: "Increases the Level of Ravaging Confession by 3.\nMaximum upgrade level is 15.",
    },
    {
      level: 4,
      title: "Painful Grace",
      description:
        "Ravaging Confession's CRIT Hits regenerate 5 Energy for Rosaria.\nCan only be triggered once each time Ravaging Confession is cast.",
    },
    {
      level: 5,
      title: "Last Rites",
      description:
        "Increases the Level of Rites of Termination by 3.\nMaximum upgrade level is 15.",
    },
    {
      level: 6,
      title: "Divine Retribution",
      description:
        "Rites of Termination's attack decreases opponents' Physical RES by 20% for 10s.",
    },
  ],

  story: [],
};

export default Character.parse(rosaria);

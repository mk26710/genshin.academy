import type { CharacterType } from "../character";

import { Character } from "../character";

const yanfei: CharacterType = {
  id: "yanfei",
  accentColor: "#B03D55",

  name: "Yanfei",
  description:
    "A well-known legal adviser active in Liyue Harbor. A brilliant young lady in whose veins runs the blood of an illuminated beast.",
  birthday: [28, 7],

  rarity: 4,
  vision: "PYRO",
  weapon: "CATALYST",

  constellations: [
    {
      level: 1,
      title: "The Law Knows No Kindness",
      description:
        "When Yanfei uses her Charged Attack, each existing Scarlet Seal additionally reduces the stamina cost of this Charged Attack by 10% and increases resistance against interruption during its release.",
    },
    {
      level: 2,
      title: "Right of Final Interpretation",
      description:
        "Increases Yanfei's Charged Attack CRIT Rate by 20% against enemies below 50% HP.",
    },
    {
      level: 3,
      title: "Samadhi Fire-Forged",
      description: "Increases the Level of Signed Edict by 3.\nMaximum upgrade level is 15.",
    },
    {
      level: 4,
      title: "Supreme Amnesty",
      description:
        "When Done Deal is used:\nCreates a shield that absorbs up to 45% of Yanfei's Max HP for 15s.\nThis shield absorbs Pyro DMG 250% more effectively.",
    },
    {
      level: 5,
      title: "Abiding Affidavit",
      description: "Increases the Level of Done Deal by 3.\nMaximum upgrade level is 15.",
    },
    {
      level: 6,
      title: "Extra Clause",
      description: "Increases the maximum number of Scarlet Seals by 1.",
    },
  ],

  story: [],
};

export default Character.parse(yanfei);

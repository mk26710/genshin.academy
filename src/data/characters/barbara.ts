import type { CharacterType } from "../character.schema";

import { Character } from "../character.schema";

const barbara: CharacterType = {
  id: "barbara",
  accentColor: "#3c6296",

  name: "Barbara",
  description:
    'Every citizen of Mondstadt adores Barbara. She learned the word "idol" from a magazine.',
  birthday: [5, 7],

  rarity: 4,
  vision: "HYDRO",
  weapon: "CATALYST",

  constellations: [
    {
      level: 1,
      title: "Gleeful Songs",
      description: "Barbara regenerates 1 Energy every 10s.",
    },
    {
      level: 2,
      title: "Vitality Burst",
      description:
        "Decreases the CD of Let the Show Begin♪ by 15%.\nDuring the ability's duration, your active character gains a 15% Hydro DMG Bonus.",
    },
    {
      level: 3,
      title: "Star of Tomorrow",
      description: "Increases the Level of Shining Miracle♪ by 3.\nMaximum upgrade level is 15.",
    },
    {
      level: 4,
      title: "Attentiveness be My Power",
      description:
        "Every opponent Barbara hits with her Charged Attack regenerates 1 Energy for her.\nA maximum of 5 energy can be regenerated in this manner with any one Charged Attack.",
    },
    {
      level: 5,
      title: "The Purest Companionship",
      description: "Increases the Level of Let the Show Begin♪ by 3.\nMaximum upgrade level is 15.",
    },
    {
      level: 6,
      title: "Dedicating Everything to You",
      description:
        "When Barbara is in the party but not on the field, and one of your own party members falls:\n·Automatically revives the fallen character.\n·Fully restores the revived character's HP to 100%.\nThis effect can only occur once every 15 mins.",
    },
  ],

  story: [],
};

export default Character.parse(barbara);

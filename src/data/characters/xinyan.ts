import type { CharacterType } from "../character";

import { Character } from "../character";

const xinyan: CharacterType = {
  id: "xinyan",
  accentColor: "#a31712",

  name: "Xinyan",
  description:
    "Liyue's sole rock 'n' roll musician. She rebels against ossified prejudices using her music and passionate singing.",
  birthday: [16, 10],

  rarity: 4,
  vision: "PYRO",
  weapon: "CLAYMORE",

  constellations: [
    {
      level: 1,
      title: "Fatal Acceleration",
      description:
        "Upon scoring a CRIT Hit, increases ATK SPD of Xinyan's Normal and Charged Attacks by 12% for 5s.\nCan only occur once every 5s.",
    },
    {
      level: 2,
      title: "Impromptu Opening",
      description:
        "Riff Revolution's Physical DMG has its CRIT Rate increased by 100%, and will form a shield at Shield Level 3: Rave when cast.",
    },
    {
      level: 3,
      title: "Double-Stop",
      description: "Increases the Level of Sweeping Fervor by 3.\nMaximum upgrade level is 15.",
    },
    {
      level: 4,
      title: "Wildfire Rhythm",
      description: "Sweeping Fervor's swing DMG decreases opponent's Physical RES by 15% for 12s.",
    },
    {
      level: 5,
      title: "Screamin' for an Encore",
      description: "Increases the Level of Riff Revolution by 3.\nMaximum upgrade level is 15.",
    },
    {
      level: 6,
      title: "Rockin' in a Flaming World",
      description:
        "Decreases the Stamina Consumption of Xinyan's Charged Attacks by 30%. Additionally, Xinyan's Charged Attacks gain an ATK Bonus equal to 50% of her DEF.",
    },
  ],

  story: [],
};

export default Character.parse(xinyan);

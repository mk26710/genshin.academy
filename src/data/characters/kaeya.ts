import type { CharacterType } from "../character";

import { Character } from "../character";

const kaeya: CharacterType = {
  id: "kaeya",
  accentColor: "#89CFE6",

  name: "Kaeya",
  description:
    "An accomplished swordsman and a strategic thinker in the Knights of Favonius, rumored to hail from beyond Mondstadt.",
  birthday: [30, 11],

  rarity: 4,
  vision: "CRYO",
  weapon: "SWORD",

  constellations: [
    {
      level: 1,
      title: "Excellent Blood",
      description:
        "The CRIT Rate of Kaeya's Normal and Charge Attacks against opponents affected by Cryo is increased by 15%.",
    },
    {
      level: 2,
      title: "Never-Ending Performance",
      description:
        "Every time Glacial Waltz defeats an opponent during its duration, its duration is increased by 2.5s, up to a maximum of 15s.",
    },
    {
      level: 3,
      title: "Dance of Frost",
      description: "Increases the Level of Frostgnaw by 3.\nMaximum upgrade level is 15.",
    },
    {
      level: 4,
      title: "Frozen Kiss",
      description:
        "Triggers automatically when Kaeya's HP falls below 20%:\nCreates a shield that absorbs damage equal to 30% of Kaeya's Max HP. Lasts for 20s.\nThis shield absorbs Cryo DMG with 250% efficiency.\nCan only occur once every 60s.",
    },
    {
      level: 5,
      title: "Frostbiting Embrace",
      description: "Increases the Level of Glacial Waltz by 3.\nMaximum upgrade level is 15.",
    },
    {
      level: 6,
      title: "Glacial Whirlwind",
      description:
        "Glacial Waltz will generate 1 additional icicle, and will regenerate 15 Energy when cast.",
    },
  ],

  story: [],
};

export default Character.parse(kaeya);

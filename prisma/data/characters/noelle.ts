import type { CharacterType } from "../character.schema";

import { Character } from "../character.schema";

const noelle: CharacterType = {
  id: "noelle",
  accentColor: "#b92e5d",

  name: "Noelle",
  description:
    "A maid who faithfully serves the Knights of Favonius. She dreams of joining their ranks someday.",
  birthday: [21, 3],

  rarity: 4,
  vision: "GEO",
  weapon: "CLAYMORE",

  constellations: [
    {
      level: 1,
      title: "I Got Your Back",
      description:
        "While Sweeping Time and Breastplate are both in effect, the chance of Breastplate's healing effects activating is increased to 100%.",
    },
    {
      level: 2,
      title: "Combat Maid",
      description:
        "Decreases the Stamina Consumption of Noelle's Charged Attacks by 20% and increases her Charged Attack DMG by 15%.",
    },
    {
      level: 3,
      title: "Invulnerable Maid",
      description: "Increases the Level of Breastplate by 3.\nMaximum upgrade level is 15.",
    },
    {
      level: 4,
      title: "To Be Cleaned",
      description:
        "When Breastplate's duration expires or it is destroyed by DMG, it will deal 400% ATK of Geo DMG to surrounding opponents.",
    },
    {
      level: 5,
      title: "Favonius Sweeper Master",
      description: "Increases the Level of Sweeping Time by 3.\nMaximum upgrade level is 15.",
    },
    {
      level: 6,
      title: "Must Be Spotless",
      description:
        "Sweeping Time increases Noelle's ATK by an additional 50% of her DEF.\nAdditionally, every opponent defeated during the skill's duration adds 1s to the duration, up to 10s.",
    },
  ],

  story: [],
};

export default Character.parse(noelle);

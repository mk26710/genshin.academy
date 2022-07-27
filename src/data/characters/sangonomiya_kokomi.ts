import type { CharacterType } from "../character.schema";

import { Character } from "../character.schema";

const sangonomiya_kokomi: CharacterType = {
  id: "sangonomiya_kokomi",
  accentColor: "#4f58b7",

  name: "Sangonomiya Kokomi",
  description:
    "The Divine Priestess of Watatsumi Island. All of the island's affairs are at this young lady's fingertips.",
  birthday: [22, 2],

  rarity: 5,
  vision: "HYDRO",
  weapon: "CATALYST",

  constellations: [
    {
      level: 1,
      title: "At Water's Edge",
      description:
        "While donning the Ceremonial Garment created by Nereid's Ascension, the final Normal Attack in Sangonomiya Kokomi's combo will unleash a swimming fish to deal 30% of her Max HP as Hydro DMG.\nThis DMG is not considered Normal Attack DMG.",
    },
    {
      level: 2,
      title: "The Clouds Like Waves Rippling",
      description:
        "Sangonomiya Kokomi gains the following Healing Bonuses with regard to characters with 50% or less HP via the following methods:\n- Kurage's Oath Bake-Kurage: 4.5% of Kokomi's Max HP.\n- Nereid's Ascension Normal and Charged Attacks: 0.6% of Kokomi's Max HP.",
    },
    {
      level: 3,
      title: "The Moon, A Ship O'er the Seas",
      description: "Increases the Level of Nereid's Ascension by 3.\nMaximum upgrade level is 15.",
    },
    {
      level: 4,
      title: "The Moon Overlooks the Waters",
      description:
        "While donning the Ceremonial Garment created by Nereid's Ascension, Sangonomiya Kokomi's Normal Attack SPD is increased by 10%, and Normal Attacks that hit opponents will restore 0.8 Energy for her.\nThis effect can occur once every 0.2s.",
    },
    {
      level: 5,
      title: "All Streams Flow to the Sea",
      description: "Increases the Level of Kurage's Oath by 3.\nMaximum upgrade level is 15.",
    },
    {
      level: 6,
      title: "Sango Isshin",
      description:
        "While donning the Ceremonial Garment created by Nereid's Ascension, Sangonomiya Kokomi gains a 40% Hydro DMG Bonus for 4s when her Normal and Charged Attacks heal, or would heal, any party member with 80% or more HP.",
    },
  ],

  story: [],
};

export default Character.parse(sangonomiya_kokomi);

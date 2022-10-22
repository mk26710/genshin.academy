import type { CharacterType } from "../character.schema";

import { Character } from "../character.schema";

const diluc: CharacterType = {
  id: "diluc",
  accentColor: "#ca3e35",

  name: "Diluc",
  description: "The tycoon of a winery empire in Mondstadt, unmatched in every possible way.",
  birthday: [30, 4],

  rarity: 5,
  vision: "PYRO",
  weapon: "CLAYMORE",

  constellations: [
    {
      level: 1,
      title: "Conviction",
      description: "Diluc deals 15% more DMG to opponents whose HP is above 50%.",
    },
    {
      level: 2,
      title: "Searing Ember",
      description:
        "When Diluc takes DMG, his ATK increases by 10% and his ATK SPD increases by 5%. Lasts for 10s.\nThis effect can stack up to 3 times and can only occur once every 1.5s.",
    },
    {
      level: 3,
      title: "Fire and Steel",
      description: "Increases the Level of Searing Onslaught by 3.\nMaximum upgrade level is 15.",
    },
    {
      level: 4,
      title: "Flowing Flame",
      description:
        "Casting Searing Onslaught in rhythm greatly increases damage dealt.\n2s after casting Searing Onslaught, casting the next Searing Onslaught in the combo deals 40% additional DMG. This effect lasts for 2s.",
    },
    {
      level: 5,
      title: "Phoenix, Harbinger of Dawn",
      description: "Increases the Level of Dawn by 3.\nMaximum upgrade level is 15.",
    },
    {
      level: 6,
      title: "Flaming Sword, Nemesis of the Dark",
      description:
        "After casting Searing Onslaught, the next 2 Normal Attacks within the next 6s will have their DMG and ATK SPD increased by 30%.\nAdditionally, Searing Onslaught will not interrupt the Normal Attack combo.",
    },
  ],

  story: [],
};

export default Character.parse(diluc);

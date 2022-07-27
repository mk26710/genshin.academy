import type { CharacterType } from "../character";

import { Character } from "../character";

const kuki_shinobu: CharacterType = {
  id: "kuki_shinobu",
  accentColor: "#a6c383",

  name: "Kuki Shinobu",
  description: ``,
  birthday: [27, 7],

  rarity: 4,
  vision: "ELECTRO",
  weapon: "SWORD",

  constellations: [
    {
      level: 1,
      title: "To Cloister Compassion",
      description: "Gyoei Narukami Kariyama Rite's AoE is increased by 50%.",
    },
    {
      level: 2,
      title: "To Forsake Fortune",
      description: "Grass Ring of Sanctification's duration is increased by 3s.",
    },
    {
      level: 3,
      title: "To Sequester Sorrow",
      description: "Increases the Level of Sanctifying Ring by 3.\nMaximum upgrade level is 15.",
    },
    {
      level: 4,
      title: "To Sever Sealing",
      description: `When the Normal, Charged, or Plunging Attacks of the character affected by Shinobu's Grass Ring of Sanctification hit opponents, a Thundergrass Mark will land on the opponent's position and deal AoE Electro DMG based on 9.7% of Shinobu's Max HP.\nThis effect can occur once every 5s.`,
    },
    {
      level: 5,
      title: "To Cease Courtesies",
      description: `Increases the Level of Gyoei Narukami Kariyama Rite by 3.\nMaximum upgrade level is 15.`,
    },
    {
      level: 6,
      title: "To Ward Weakness",
      description: `When Kuki Shinobu takes lethal DMG, this instance of DMG will not take her down. This effect will automatically trigger when her HP reaches 1 and will trigger once every 60s.\nWhen Shinobu's HP drops below 25%, she will gain 150 Elemental Mastery for 15s. This effect will trigger once every 60s.`,
    },
  ],

  story: [],
};

export default Character.parse(kuki_shinobu);

import type { CharacterType } from "../character.schema";

import { Character } from "../character.schema";

const hu_tao: CharacterType = {
  id: "hu_tao",
  accentColor: "#d24138",

  name: "Hu Tao",
  description:
    "The 77th Director of the Wangsheng Funeral Parlor. She took over the business at a rather young age.",
  birthday: [15, 7],

  rarity: 5,
  vision: "PYRO",
  weapon: "POLEARM",

  constellations: [
    {
      level: 1,
      title: "Crimson Bouquet",
      description:
        "While in a Paramita Papilio state activated by Guide to Afterlife, Hu Tao's Charge Attacks do not consume Stamina.",
    },
    {
      level: 2,
      title: "Ominous Rainfall",
      description:
        "Increases the Blood Blossom DMG by an amount equal to 10% of Hu Tao's Max HP at the time the effect is applied.\nAdditionally, Spirit Soother will also apply the Blood Blossom effect.",
    },
    {
      level: 3,
      title: "Lingering Carmine",
      description: "Increases the Level of Guide to Afterlife by 3.\nMaximum upgrade level is 15.",
    },
    {
      level: 4,
      title: "Garden of Eternal Rest",
      description:
        "Upon defeating an enemy affected by a Blood Blossom that Hu Tao applied herself, all nearby allies in the party (excluding Hu Tao herself) will have their CRIT Rate increased by 12% for 15s.",
    },
    {
      level: 5,
      title: "Floral Incense",
      description: "Increases the Level of Spirit Soother by 3.\nMaximum upgrade level is 15.",
    },
    {
      level: 6,
      title: "Butterfly's Embrace",
      description:
        "Triggers when Hu Tao's HP drops below 25%, or when she suffers a lethal strike:\nHu Tao will not fall as a result of the DMG sustained. Additionally, for the next 10s, all of her Elemental and Physical RES is increased by 200%, her CRIT Rate is increased by 100%, and her resistance to interruption is greatly increased.\nThis effect triggers automatically when Hu Tao has 1 HP left.\nCan only occur once every 60s.",
    },
  ],

  story: [],
};

export default Character.parse(hu_tao);

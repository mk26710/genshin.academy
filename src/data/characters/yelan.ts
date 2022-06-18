import deepFreeze from "deep-freeze";

import { Rarity, Vision, Weapon } from "@/data/types/genshin";
import type { Character } from "@/data/character";

const yelan: Character = {
  id: "yelan",

  name: "Yelan",
  description: `A mysterious person who claims to work for the Ministry of Civil Affairs, but is a "non-entity" on the Ministry of Civil Affairs' list.`,

  birthday: [20, 4],

  rarity: Rarity.FIVE_STAR,

  vision: Vision.HYDRO,
  weapon: Weapon.BOW,

  constellations: [
    {
      level: 1,
      title: "Enter the Plotters",
      description: "Lingering Lifeline gains 1 additional charge.",
    },
    {
      level: 2,
      title: "Taking All Comers",
      description: `When Exquisite Throw conducts a coordinated attack, it will fire an additional water arrow that will deal 14% of Yelan's Max HP as Hydro DMG. This effect can trigger once every 1.8s.`,
    },
    {
      level: 3,
      title: "Beware the Trickster's Dice",
      description: "Increases the Level of Depth-Clarion Dice by 3. Maximum upgrade level is 15.",
    },
    {
      level: 4,
      title: "Bait-and-Switch",
      description:
        "Increases all party members' Max HP by 10% for 25s for every opponent marked by Lifeline when the Lifeline explodes. A maximum increase of 40% Max HP can be attained in this manner.",
    },
    {
      level: 5,
      title: "Dealer's Sleight",
      description: "Increases the Level of Lingering Lifeline by 3. Maximum upgrade level is 15.",
    },
    {
      level: 6,
      title: "Winner Takes All",
      description:
        "After using Depth-Clarion Dice, Yelan will enter the Mastermind state. In this state, all of Yelan's Normal Attacks will be special Breakthrough Barbs. These Breakthrough Barbs will have similar abilities to normal ones and the DMG dealt will be considered Charged Attack DMG, dealing 156% of a normal Breakthrough Barb's DMG. The Mastermind state lasts 20s and will be cleared after Yelan fires 5 arrows.",
    },
  ],

  story: [],
};

export default deepFreeze(yelan);

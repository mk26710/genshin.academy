import type { CharacterType } from "../character";

import { Character } from "../character";

const xingqiu: CharacterType = {
  id: `xingqiu`,
  accentColor: `#457996`,

  name: `Xingqiu`,
  description: `A young man carrying a longsword who is frequently seen at book booths. He has a chivalrous heart and yearns for justice and fairness for all.`,
  birthday: [9, 10],

  rarity: 4,
  vision: `HYDRO`,
  weapon: `SWORD`,

  constellations: [
    {
      level: 1,
      title: `The Scent Remained`,
      description: `Increases the maximum number of Rain Swords by 1.`,
    },
    {
      level: 2,
      title: `Rainbow Upon the Azure Sky`,
      description: `Extends the duration of Guhua Sword: Raincutter by 3s.\nDecreases the Hydro RES of opponents hit by sword rain attacks by 15% for 4s.`,
    },
    {
      level: 3,
      title: `Weaver of Verses`,
      description: `Increases the Level of Guhua Sword: Raincutter by 3.\nMaximum upgrade level is 15.`,
    },
    {
      level: 4,
      title: `Evilsoother`,
      description: `Throughout the duration of Guhua Sword: Raincutter, the DMG dealt by Guhua Sword: Fatal Rainscreen is increased by 50%.`,
    },
    {
      level: 5,
      title: `Embrace of Rain`,
      description: `Increases the Level of Guhua Sword: Fatal Rainscreen by 3.\nMaximum upgrade level is 15.`,
    },
    {
      level: 6,
      title: `Hence, Call Them My Own Verses`,
      description: `Activating 2 of Guhua Sword: Raincutter's sword rain attacks greatly enhances the third sword rain attack. On hit, the third sword rain attack also regenerates 3 Energy for Xingqiu.`,
    },
  ],

  story: [],
};

export default Character.parse(xingqiu);

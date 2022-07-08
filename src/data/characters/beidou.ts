import type { CharacterType } from "../character";

import { Character } from "../character";

const beidou: CharacterType = {
  id: `beidou`,
  accentColor: `#b13b4e`,

  name: `Beidou`,
  description: `Captain of her crew, The Crux. She's quite an unbound and forthright woman.`,
  birthday: [14, 2],

  rarity: 4,
  vision: `ELECTRO`,
  weapon: `CLAYMORE`,

  constellations: [
    {
      level: 1,
      title: `Sea Beast's Scourge`,
      description: `When Stormbreaker is used:\nCreates a shield that absorbs up to 16% of Beidou's Max HP for 15s.\nThis shield absorbs Electro DMG 250% more effectively.`,
    },
    {
      level: 2,
      title: `Upon the Turbulent Sea, the Thunder Arises`,
      description: `Stormbreaker's arc lightning can jump to 2 additional targets.`,
    },
    {
      level: 3,
      title: `Summoner of Storm`,
      description: `Increases the Level of Tidecaller by 3.\nMaximum upgrade level is 15.`,
    },
    {
      level: 4,
      title: `Stunning Revenge`,
      description: `Upon being attacked, Beidou's Normal Attacks gain an additional instance of 20% Electro DMG for 10s.`,
    },
    {
      level: 5,
      title: `Crimson Tidewalker`,
      description: `Increases the Level of Stormbreaker by 3.\nMaximum upgrade level is 15.`,
    },
    {
      level: 6,
      title: `Bane of Evil`,
      description: `During the duration of Stormbreaker, the Electro RES of surrounding opponents is decreased by 15%.`,
    },
  ],

  story: [],
};

export default Character.parse(beidou);

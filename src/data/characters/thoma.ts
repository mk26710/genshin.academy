import type { CharacterType } from "../character";

import { Character } from "../character";

const thoma: CharacterType = {
  id: `thoma`,
  accentColor: `#ac3a49`,

  name: `Thoma`,
  description: `The Kamisato Clan's housekeeper. A well-known "fixer" in Inazuma.`,
  birthday: [9, 1],

  rarity: 4,
  vision: `PYRO`,
  weapon: `POLEARM`,

  constellations: [
    {
      level: 1,
      title: `A Comrade's Duty`,
      description: `When a character protected by Thoma's own Blazing Barrier (Thoma excluded) is attacked, Thoma's own Blazing Blessing CD is decreased by 3s, while his own Crimson Ooyoroi's CD is decreased by 3s.\nThis effect can be triggered once every 20s.`,
    },
    {
      level: 2,
      title: `A Subordinate's Skills`,
      description: `Crimson Ooyoroi's duration is increased by 3s.`,
    },
    {
      level: 3,
      title: `Fortified Resolve`,
      description: `Increases the Level of Blazing Blessing by 3.\nMaximum upgrade level is 15.`,
    },
    {
      level: 4,
      title: `Long-Term Planning`,
      description: `After using Crimson Ooyoroi, 15 Energy will be restored to Thoma.`,
    },
    {
      level: 5,
      title: `Raging Wildfire`,
      description: `Increases the Level of Crimson Ooyoroi by 3.\nMaximum upgrade level is 15.`,
    },
    {
      level: 6,
      title: `Burning Heart`,
      description: `When a Blazing Barrier is obtained or refreshed, the DMG dealt by all party members' Normal, Charged, and Plunging Attacks is increased by 15% for 6s.`,
    },
  ],

  story: [],
};

export default Character.parse(thoma);

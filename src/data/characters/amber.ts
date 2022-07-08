import type { CharacterType } from "../character";

import { Character } from "../character";

const amber: CharacterType = {
  id: `amber`,
  accentColor: `#a8191d`,

  name: `Amber`,
  description: `Always energetic and full of life, Amber's the best — albeit only — Outrider of the Knights of Favonius.`,
  birthday: [10, 8],

  rarity: 5,
  vision: `PYRO`,
  weapon: `BOW`,

  constellations: [
    {
      level: 1,
      title: `One Arrow to Rule Them All`,
      description: `Fires 2 arrows per Aimed Shot. The second arrow deals 20% of the first arrow's DMG.`,
    },
    {
      level: 2,
      title: `Bunny Triggered`,
      description: `Baron Bunny, new and improved! Hitting Baron Bunny's foot with a fully-charged Aimed Shot manually detonates it.\nExplosion via manual detonation deals 200% additional DMG.`,
    },
    {
      level: 3,
      title: `It Burns!`,
      description: `Increases the Level of Fiery Rain by 3.\nMaximum upgrade level is 15.`,
    },
    {
      level: 4,
      title: `It's Not Just Any Doll...`,
      description: `Decreases Explosive Puppet's CD by 20%. Adds 1 additional charge.`,
    },
    {
      level: 5,
      title: `It's Baron Bunny!`,
      description: `Increases the Level of Explosive Puppet by 3.\nMaximum upgrade level is 15.`,
    },
    {
      level: 6,
      title: `Wildfire`,
      description: `Fiery Rain increases all party members' Movement SPD by 15% and ATK by 15% for 10s.`,
    },
  ],

  story: [],
};

export default Character.parse(amber);

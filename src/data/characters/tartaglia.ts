import type { CharacterType } from "../character";

import { Character } from "../character";
import { Rarity, Vision, Weapon } from "../types/genshin";

const tartaglia: CharacterType = {
  id: `tartaglia`,
  accentColor: `#0b33bd`,

  name: `Tartaglia`,
  description: `No. 11 of The Harbingers, also known as "Childe." His name is highly feared on the battlefield.`,
  birthday: [20, 7],

  rarity: Rarity.FIVE_STAR,
  vision: Vision.HYDRO,
  weapon: Weapon.BOW,

  constellations: [
    {
      level: 1,
      title: `Foul Legacy: Tide Withholder`,
      description: `Decreases the CD of Foul Legacy: Raging Tide by 20%`,
    },
    {
      level: 2,
      title: `Foul Legacy: Understream`,
      description: `When opponents affected by Riptide are defeated, Tartaglia regenerates 4 Elemental Energy.`,
    },
    {
      level: 3,
      title: `Abyssal Mayhem: Vortex of Turmoil`,
      description: `Increases the Level of Foul Legacy: Raging Tide by 3.\nMaximum upgrade level is 15.`,
    },
    {
      level: 4,
      title: `Abyssal Mayhem: Hydrospout`,
      description: `If Tartaglia is in Foul Legacy:\nRaging Tide's Melee Stance, triggers Riptide Slash against opponents on the field affected by Riptide every 4s, otherwise, triggers Riptide Flash.\nRiptide Slashes and Riptide Flashes triggered by this Constellation effect are not subject to the time intervals that would typically apply to these two Riptide effects, nor do they have any effect on those time intervals.`,
    },
    {
      level: 5,
      title: `Havoc: Formless Blade`,
      description: `Increases the Level of Havoc: Obliteration by 3\nMaximum upgrade level is 15.`,
    },
    {
      level: 6,
      title: `Havoc: Annihilation`,
      description: `When Havoc: Obliteration is cast in Melee Stance, the CD of Foul Legacy: Raging Tide is reset.\nThis effect will only take place once Tartaglia returns to his Ranged Stance.`,
    },
  ],

  story: [],
};

export default Character.parse(tartaglia);

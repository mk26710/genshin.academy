import type { CharacterType } from "../character";

import { Character } from "../character";
import { Rarity, Vision, Weapon } from "../types/genshin";

const diona: CharacterType = {
  id: `diona`,
  accentColor: `#F7BDBC`,

  name: `Diona`,
  description: `A young lady who has inherited trace amounts of non-human blood. She is the incredibly popular bartender of the Cat's Tail tavern.`,
  birthday: [18, 1],

  rarity: Rarity.FOUR_STAR,
  vision: Vision.CRYO,
  weapon: Weapon.BOW,

  constellations: [
    {
      level: 1,
      title: `A Lingering Flavor`,
      description: `Regenerates 15 Energy for Diona after the effects of Signature Mix end.`,
    },
    {
      level: 2,
      title: `Shaken, Not Purred`,
      description: `Increases Icy Paws' DMG by 15%, and increases its shield's DMG Absorption by 15%.\nAdditionally, when paws hit their targets, creates a shield for other nearby characters on the field with 50% of the Icy Paws shield's DMG Absorption for 5s.`,
    },
    {
      level: 3,
      title: `A—Another Round?`,
      description: `Increases the Level of Signature Mix by 3.\nMaximum upgrade level is 15.`,
    },
    {
      level: 4,
      title: `Wine Industry Slayer`,
      description: `Within the radius of Signature Mix, Diona's charge time for aimed shots is reduced by 60%`,
    },
    {
      level: 5,
      title: `Double Shot, On The Rocks`,
      description: `Increases the Level of Icy Paws by 3.\nMaximum upgrade level is 15.`,
    },
    {
      level: 6,
      title: `Cat's Tail Closing Time`,
      description: `Characters within Signature Mix's radius will gain the following effects based on their HP amounts:\n·Increases Incoming Healing Bonus by 30% when HP falls below or is equal to 50%.\n·Elemental Mastery increased by 200 when HP is above 50%.`,
    },
  ],

  story: [],
};

export default Character.parse(diona);

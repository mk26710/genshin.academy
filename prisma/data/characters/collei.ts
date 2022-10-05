import type { CharacterType } from "../character.schema";

import { Character } from "../character.schema";

const collei: CharacterType = {
  id: "collei",
  accentColor: "#d8e3b0",

  name: "Collei",
  description: `A trainee ranger active in Avidya Forest. Behind her enthusiastic words and actions hides a slightly introverted personality.\n\n"Oh, you're going to Sumeru? Can you give my regards to Collei? Well... it's been so long, I wonder if her hair has grown out and if she's taller?" — Amber`,
  region: "SUMERU",
  birthday: [8, 5],

  rarity: 4,
  vision: "DENDRO",
  weapon: "BOW",

  constellations: [
    {
      level: 1,
      title: "Deepwood Patrol",
      description: `When in the party and not on the field, Collei's Energy Recharge is increased by 20%.`,
    },
    {
      level: 2,
      title: "Through Hill and Copse",
      description: `The Passive Talent Floral Sidewinder is changed to this:\nThe Floral Ring will grant the character the Sprout effect from Floral Sidewinder upon return, dealing 40% of Collei's ATK as Dendro DMG to nearby opponents for 3s.\nFrom the moment of using Floral Brush to the moment when this instance of Sprout effect ends, if any of your party members triggers Burning, Quicken, Aggravate, Spread, Bloom, Hyperbloom, or Burgeon reactions, the Sprout effect will be extended by 3s.\nThe Sprout effect can only be extended this way once. If another Sprout effect is triggered during its initial duration, the initial effect will be removed.\nRequires you to have unlocked the Floral Sidewinder Passive Talent.`,
    },
    {
      level: 3,
      title: "Scent of Summer",
      description: `Increases the Level of Floral Brush by 3.\nMaximum upgrade level is 15.`,
    },
    {
      level: 4,
      title: "Gift of the Woods",
      description: `Using Trump-Card Kitty will increase all nearby characters' Elemental Mastery by 60 for 12s (not including Collei herself).`,
    },
    {
      level: 5,
      title: "All Embers",
      description: "Increases the Level of Trump-Card Kitty by 3.\nMaximum upgrade level is 15.",
    },
    {
      level: 6,
      title: "Forest of Falling Arrows",
      description: `When the Floral Ring hits opponents, it will create a miniature Cuilein-Anbar that will deal 200% of Collei's ATK as Dendro DMG.\nEach Floral Brush can only create one such miniature Cuilein-Anbar.`,
    },
  ],
};

export default Character.parse(collei);

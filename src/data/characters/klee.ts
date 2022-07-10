import type { CharacterType } from "../character";

import { Character } from "../character";

const klee: CharacterType = {
  id: "klee",
  accentColor: "#a0301b",

  name: "Klee",
  description:
    "An explosives expert and a regular at the Knights of Favonius's confinement room. Also known as Fleeing Sunligh",
  birthday: [27, 7],

  rarity: 5,
  vision: "PYRO",
  weapon: "CATALYST",

  constellations: [
    {
      level: 1,
      title: "Chained Reactions",
      description:
        "Attacks and Skills have a certain chance to summon sparks that bombard opponents, dealing DMG equal to 120% of Sparks 'n' Splash's DMG.",
    },
    {
      level: 2,
      title: "Explosive Frags",
      description: "Being hit by Jumpy Dumpty's mines decreases opponents' DEF by 23% for 10s.",
    },
    {
      level: 3,
      title: "Exquisite Compound",
      description: "Increases the Level of Jumpy Dumpty by 3.\nMaximum upgrade level is 15.",
    },
    {
      level: 4,
      title: "Sparkly Explosion",
      description:
        "If Klee leaves the field during the duration of Sparks 'n' Splash, her departure triggers an explosion that deals 555% of her ATK as AoE Pyro DMG.",
    },
    {
      level: 5,
      title: "Nova Burst",
      description: "Increases the Level of Sparks 'n' Splash by 3.\nMaximum upgrade level is 15.",
    },
    {
      level: 6,
      title: "Blazing Delight",
      description: `While under the effects of Sparks 'n' Splash, Klee will regenerate 3 Energy for all members of the party (excluding Klee) every 3s
      \nWhen Sparks 'n' Splash is used, all party members will gain a 10% Pyro DMG Bonus for 25s.`,
    },
  ],

  story: [],
};

export default Character.parse(klee);

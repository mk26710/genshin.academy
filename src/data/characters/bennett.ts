import type { CharacterType } from "../character";

import { Character } from "../character";

const bennett: CharacterType = {
  id: "bennett",
  accentColor: "#ebab18",

  name: "Bennett",
  description: "A good-natured adventurer from Mondstadt who's unfortunately extremely unlucky.",
  birthday: [29, 2],

  rarity: 4,
  vision: "PYRO",
  weapon: "SWORD",

  constellations: [
    {
      level: 1,
      title: "Grand Expectation",
      description:
        "Fantastic Voyage's ATK increase no longer has an HP restriction, and gains an additional 20% of Bennett's Base ATK.",
    },
    {
      level: 2,
      title: "Impasse Conqueror",
      description: "When Bennett's HP falls below 70%, his Energy Recharge is increased by 30%.",
    },
    {
      level: 3,
      title: "Unstoppable Fervor",
      description: "Increases the Level of Passion Overload by 3.\nMaximum upgrade level is 15.",
    },
    {
      level: 4,
      title: "Unexpected Odyssey",
      description:
        "Using a Normal Attack when executing the second attack of Passion Overload's Charge Level 1 allows an additional attack to be performed.\nThis additional attack does 135% of the second attack's DMG.",
    },
    {
      level: 5,
      title: "True Explorer",
      description: "Increases the Level of Fantastic Voyage by 3.\nMaximum upgrade level is 15.",
    },
    {
      level: 6,
      title: "Fire Ventures with Me",
      description:
        "Sword, Claymore, or Polearm-wielding characters inside Fantastic Voyage's radius gain a 15% Pyro DMG Bonus and their weapons are infused with Pyro.",
    },
  ],

  story: [],
};

export default Character.parse(bennett);

import type { CharacterType } from "../character.schema";

import { Character } from "../character.schema";

const venti: CharacterType = {
  id: "venti",
  accentColor: "#11eab7",

  name: "Venti",
  description:
    "One of the many bards of Mondstadt, who freely wanders the city's streets and alleys.",
  birthday: [16, 6],

  rarity: 5,
  vision: "ANEMO",
  weapon: "BOW",

  constellations: [
    {
      level: 1,
      title: "Splitting Gales",
      description:
        "Fires 2 additional arrows per Aimed Shot, each dealing 33% of the original arrow's DMG.",
    },
    {
      level: 2,
      title: "Breeze of Reminiscence",
      description:
        "Skyward Sonnet decreases opponents' Anemo RES and Physical RES by 12% for 10s.\nOpponents launched by Skyward Sonnet suffer an additional 12% Anemo RES and Physical RES decrease while airborne.",
    },
    {
      level: 3,
      title: "Ode to Thousand Winds",
      description: "Increases the Level of Wind's Grand Ode by 3.\nMaximum upgrade level is 15.",
    },
    {
      level: 4,
      title: "Hurricane of Freedom",
      description:
        "When Venti picks up an Elemental Orb or Particle, he receives a 25% Anemo DMG Bonus for 10s.",
    },
    {
      level: 5,
      title: "Concerto dal Cielo",
      description: "Increases the Level of Skyward Sonnet by 3.\nMaximum upgrade level is 15.",
    },
    {
      level: 6,
      title: "Storm of Defiance",
      description:
        "Targets who take DMG from Wind's Grand Ode have their Anemo RES decreased by 20%.\nIf an Elemental Absorption occurred, then their RES towards the corresponding Element is also decreased by 20%.",
    },
  ],

  story: [],
};

export default Character.parse(venti);

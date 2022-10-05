import type { CharacterType } from "../character.schema";

import { Character } from "../character.schema";

const shikanoin_heizou: CharacterType = {
  id: "shikanoin_heizou",
  accentColor: "#783346",

  name: "Shikanoin Heizou",
  description: `A young prodigy detective from the Tenryou Commission. His senses are sharp and his thoughts are clear.`,
  birthday: [24, 7],

  rarity: 4,
  vision: "ANEMO",
  weapon: "CATALYST",

  constellations: [
    {
      level: 1,
      title: "Named Juvenile Casebook",
      description: `For 5s after Shikanoin Heizou takes the field, his Normal Attack SPD is increased by 15%. He also gains 1 Declension stack for Heartstopper Strike. This effect can be triggered once every 10s.`,
    },
    {
      level: 2,
      title: "Investigative Collection",
      description: `The pull effect of the Arresting Windtunnel created by Windmuster Kick is enhanced, and its duration is increased to 1s.`,
    },
    {
      level: 3,
      title: "Esoteric Puzzle Book",
      description: `Increases the Level of Heartstopper Strike by 3.\nMaximum upgrade level is 15.`,
    },
    {
      level: 4,
      title: "Tome of Lies",
      description: `The first Windmuster Iris explosion in each Windmuster Kick will regenerate 9 Elemental Energy for Shikanoin Heizou. Every subsequent explosion in that Windmuster Kick will each regenerate an additional 1.5 Energy for Heizou.\nOne Windmuster Kick can regenerate a total of 13.5 Energy for Heizou in this manner.`,
    },
    {
      level: 5,
      title: "Secret Archive",
      description: `Increases the Level of Windmuster Kick by 3.\nMaximum upgrade level is 15.`,
    },
    {
      level: 6,
      title: "Curious Casefiles",
      description: `Each Declension stack will increase the CRIT Rate of the Heartstopper Strike unleashed by 4%. When Heizou possesses Conviction, this Heartstopper Strike's CRIT DMG is increased by 32%.`,
    },
  ],

  story: [],
};

export default Character.parse(shikanoin_heizou);

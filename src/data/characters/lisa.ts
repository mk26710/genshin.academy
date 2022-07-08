import type { CharacterType } from "../character";

import { Character } from "../character";

const lisa: CharacterType = {
  id: `lisa`,
  accentColor: `#7a6fb9`,

  name: `Lisa`,
  description: `The languid but knowledgeable Librarian of the Knights of Favonius, deemed by Sumeru Academia to be their most distinguished graduate in the past two centuries.`,
  birthday: [9, 6],

  rarity: 4,
  vision: `ELECTRO`,
  weapon: `CATALYST`,

  constellations: [
    {
      level: 1,
      title: `Infinite Circuit`,
      description: `Lisa regenerates 2 Energy for every opponent hit while holding Violet Arc.\nA maximum of 10 Energy can be regenerated in this manner at any one time.`,
    },
    {
      level: 2,
      title: `Electromagnetic Field`,
      description: `Holding Violet Arc has the following effects:\n·Increases DEF by 25%.\n·Increases Lisa's resistance to interruption.`,
    },
    {
      level: 3,
      title: `Resonant Thunder`,
      description: `Increases the Level of Lightning Rose by 3.\nMaximum upgrade level is 15.`,
    },
    {
      level: 4,
      title: `Plasma Eruption`,
      description: `Increases the number of lightning bolts released by Lightning Rose by 1-3.`,
    },
    {
      level: 5,
      title: `Electrocute`,
      description: `Increases the Level of Violet Arc by 3.\nMaximum upgrade level is 15.`,
    },
    {
      level: 6,
      title: `Pulsating Witch`,
      description: `When Lisa takes the field, she applies 3 stacks of Violet Arc's Conductive status onto nearby opponents.\nThis effect can only occur once every 5s.`,
    },
  ],

  story: [],
};

export default Character.parse(lisa);

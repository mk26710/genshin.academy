import type { CharacterType } from "../character";

import { Character } from "../character";

const kujou_sara: CharacterType = {
  id: `kujou_sara`,
  accentColor: `#ce4a4e`,

  name: `Kujou Sara`,
  description: `A general of the Tenryou Commission. Bold, decisive, and skilled in battle.`,
  birthday: [14, 7],

  rarity: 4,
  vision: `ELECTRO`,
  weapon: `BOW`,

  constellations: [
    {
      level: 1,
      title: `Crow's Eye`,
      description: `When Tengu Juurai grant characters ATK Bonuses or hits opponents, the CD of Tengu Stormcall is decreased by 1s.\nThis effect can be triggered once every 3s.`,
    },
    {
      level: 2,
      title: `Dark Wings`,
      description: `Unleashing Tengu Stormcall will leave a weaker Crowfeather at Kujou Sara's original position that will deal 30% of its original DMG.`,
    },
    {
      level: 3,
      title: `The War Within`,
      description: `Increases the Level of Subjugation: Koukou Sendou by 3.\nMaximum upgrade level is 15.`,
    },
    {
      level: 4,
      title: `Conclusive Proof`,
      description: `The number of Tengu Juurai: Stormcluster released by Subjugation: Koukou Sendou is increased to 6.`,
    },
    {
      level: 5,
      title: `Spellsinger`,
      description: `Increases the Level of Tengu Stormcall by 3.\nMaximum upgrade level is 15.`,
    },
    {
      level: 6,
      title: `Sin of Pride`,
      description: `The Electro DMG of characters who have had their ATK increased by Tengu Juurai has its Crit DMG increased by 60%.`,
    },
  ],

  story: [],
};

export default Character.parse(kujou_sara);

import type { CharacterType } from "../character";

import { Character } from "../character";

const gorou: CharacterType = {
  id: `gorou`,
  accentColor: `#3abdbf`,

  name: `Gorou`,
  description: `The great general of Watatsumi Island's forces. He is deeply trusted by his subordinates.`,
  birthday: [18, 5],

  rarity: 4,
  vision: `GEO`,
  weapon: `BOW`,

  constellations: [
    {
      level: 1,
      title: `Rushing Hound: Swift as the Wind`,
      description: `When characters (other than Gorou) within the AoE of Gorou's General's War Banner or General's Glory deal Geo DMG to opponents, the CD of Gorou's Inuzaka All-Round Defense is decreased by 2s.\nThis effect can occur once every 10s.`,
    },
    {
      level: 2,
      title: `Sitting Hound: Steady as a Clock`,
      description: `While General's Glory is in effect, its duration is extended by 1s when a nearby active character obtains an Elemental Shard from a Crystallize reaction.\nThis effect can occur once every 0.1s. Max extension is 3s.`,
    },
    {
      level: 3,
      title: `Mauling Hound: Fierce as Fire`,
      description: `Increases the Level of Inuzaka All-Round Defense by 3.\nMaximum upgrade level is 15.`,
    },
    {
      level: 4,
      title: `Lapping Hound: Warm as Water`,
      description: `When General's Glory is in the "Impregnable" or "Crunch" states, it will also heal active characters within its AoE by 50% of Gorou's own DEF every 1.5s.`,
    },
    {
      level: 5,
      title: `Striking Hound: Thunderous Force`,
      description: `Increases the Level of Juuga: Forward Unto Victory by 3.\nMaximum upgrade level is 15.`,
    },
    {
      level: 6,
      title: `Valiant Hound: Mountainous Fealty`,
      description: `For 12s after using Inuzaka All-Round Defense or Juuga: Forward Unto Victory, increases the CRIT DMG of all nearby party members' Geo DMG based on the buff level of the skill's field at the time of use:\n· "Standing Firm": +10%\n· "Impregnable": +20%\n· "Crunch": +40%\n\nThis effect cannot stack and will take reference from the last instance of the effect that is triggered.`,
    },
  ],

  story: [],
};

export default Character.parse(gorou);

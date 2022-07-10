import type { CharacterType } from "../character";

import { Character } from "../character";

const aloy: CharacterType = {
  id: "aloy",
  accentColor: "#7dd7f5",

  name: "Aloy",
  description:
    "Formerly an outcast, now a hunter of unparalleled skill. Ready to do the right thing at any time.",
  birthday: [4, 4],

  rarity: 5,
  vision: "CRYO",
  weapon: "BOW",

  constellations: [
    {
      level: 1,
      title: "Star of Another World",
      description:
        "The time has not yet come for this person's corner of the night sky to light up.",
    },
    {
      level: 2,
      title: "Star of Another World",
      description:
        "The time has not yet come for this person's corner of the night sky to light up.",
    },
    {
      level: 3,
      title: "Star of Another World",
      description:
        "The time has not yet come for this person's corner of the night sky to light up.",
    },
    {
      level: 4,
      title: "Star of Another World",
      description:
        "The time has not yet come for this person's corner of the night sky to light up.",
    },
    {
      level: 5,
      title: "Star of Another World",
      description:
        "The time has not yet come for this person's corner of the night sky to light up.",
    },
    {
      level: 6,
      title: "Star of Another World",
      description:
        "The time has not yet come for this person's corner of the night sky to light up.",
    },
  ],

  story: [],
};

export default Character.parse(aloy);

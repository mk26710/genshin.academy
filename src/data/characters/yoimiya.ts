import type { CharacterType } from "../character";

import { Character } from "../character";

const yoimiya: CharacterType = {
  id: "yoimiya",
  accentColor: "#eb9263",

  name: "Yoimiya",
  description:
    'Owner of Naganohara Fireworks. Known as "Queen of the Summer Festival," she excels in her craft of creating fireworks that symbolize people\'s hopes and dreams.',
  birthday: [21, 6],

  rarity: 5,

  vision: "PYRO",
  weapon: "BOW",

  constellations: [
    {
      level: 1,
      title: "Agate Ryuukin",
      description:
        "The Aurous Blaze created by Ryuukin Saxifrage lasts for an extra 4s.\nAdditionally, when an opponent affected by Aurous Blaze is defeated within its duration, Yoimiya's ATK is increased by 20% for 20s.",
    },
    {
      level: 2,
      title: "A Procession of Bonfires",
      description:
        "When Yoimiya's Pyro DMG scores a CRIT Hit, Yoimiya will gain a 25% Pyro DMG Bonus for 6s.\nThis effect can be triggered even when Yoimiya is not the active character.",
    },
    {
      level: 3,
      title: "Trickster's Flare",
      description: "Increases the Level of Niwabi Fire-Dance by 3.\nMaximum upgrade level is 15.",
    },
    {
      level: 4,
      title: "Pyrotechnic Professional",
      description:
        "When Yoimiya's own Aurous Blaze triggers an explosion, Niwabi Fire-Dance's CD is decreased by 1.2s.",
    },
    {
      level: 5,
      title: "A Summer Festival's Eve",
      description: "Increases the Level of Ryuukin Saxifrage by 3.\nMaximum upgrade level is 15",
    },
    {
      level: 6,
      title: "Naganohara Meteor Swarm",
      description:
        "During Niwabi Fire-Dance, Yoimiya's Normal Attacks have a 50% chance of firing an extra Kindling Arrow that deals 60% of its original DMG. This DMG is considered Normal Attack DMG.",
    },
  ],

  story: [],
};

export default Character.parse(yoimiya);

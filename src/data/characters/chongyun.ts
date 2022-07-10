import type { CharacterType } from "../character";

import { Character } from "../character";

const chongyun: CharacterType = {
  id: "chongyun",
  accentColor: "#649bc4",

  name: "Chongyun",
  description:
    "A young exorcist from a family of exorcists. He does everything he can to suppress his abundance of yang energy.",
  birthday: [7, 9],

  rarity: 4,
  vision: "CRYO",
  weapon: "CLAYMORE",

  constellations: [
    {
      level: 1,
      title: "Ice Unleashed",
      description:
        "The last attack of Chongyun's Normal Attack combo releases 3 ice blades. Each blade deals 50% of Chongyun's ATK as Cryo DMG to all opponents in its path.",
    },
    {
      level: 2,
      title: "Atmospheric Revolution",
      description:
        "Elemental Skills and Elemental Bursts cast within the Frost Field created by Spirit Blade: Chonghua's Layered Frost have their CD time decreased by 15%.",
    },
    {
      level: 3,
      title: "Cloudburst",
      description:
        "Increases the Level of Spirit Blade: Cloud-parting Star by 3.\nMaximum upgrade level is 15.",
    },
    {
      level: 4,
      title: "Frozen Skies",
      description:
        "Chongyun regenerates 1 Energy every time he hits an opponent affected by Cryo.\nThis effect can only occur once every 2s.",
    },
    {
      level: 5,
      title: "The True Path",
      description:
        "Increases the Level of Spirit Blade: Chonghua's Layered Frost by 3.\nMaximum upgrade level is 15.",
    },
    {
      level: 6,
      title: "Rally of Four Blades",
      description:
        "Spirit Blade: Cloud-parting Star deals 15% more DMG to opponents with a lower percentage of their Max HP remaining than Chongyun.\nThis skill will also summon 1 additional spirit blade.",
    },
  ],

  story: [],
};

export default Character.parse(chongyun);

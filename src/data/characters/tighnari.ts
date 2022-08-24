import type { CharacterType } from "../character.schema";

import { Character } from "../character.schema";

const tighnari: CharacterType = {
  id: "tighnari",
  accentColor: "#c9d445",

  name: "Tighnari",
  description: `A message for you. I brought back a specialty from the desert, two packs of honeyed dates, which helps to replenish your energy, whether in the morning or at night. Thank you for your patience in teaching and taking care of Collei. Good luck with your work and best wishes for Collei's studies."\n—An anonymously written message left inside a candy box, placed on the watcher's table.`,
  birthday: [29, 12],

  rarity: 5,
  vision: "DENDRO",
  weapon: "BOW",

  constellations: [
    {
      level: 1,
      title: "Beginnings Determined at the Roots",
      description: "Tighnari's Charged Attack CRIT Rate is increased by 15%.",
    },
    {
      level: 2,
      title: "Origins Known From the Stem",
      description: `When there are opponents within the Vijnana-Khanda Field created by Vijnana-Phala Mine, Tighnari gains 20% Dendro DMG Bonus.\n\nThe effect will last up to 6s if the field's duration ends or if it no longer has opponents with it.`,
    },
    {
      level: 3,
      title: "Fortunes Read Amongst the Branches",
      description: `Increases the Level of Fashioner's Tanglevine Shaft by 3.\n\nMaximum upgrade level is 15.`,
    },
    {
      level: 4,
      title: "Withering Glimpsed in the Leaves",
      description: `When Fashioner's Tanglevine Shaft is unleashed, all nearby party members gain 60 Elemental Mastery for 8s. If the Fashioner's Tanglevine Shaft triggers a Burning, Bloom, Quicken, or Spread reaction, their Elemental Mastery will be further increased by 60. This latter case will also refresh the buff state's duration.`,
    },
    {
      level: 5,
      title: "Comprehension Amidst the Flowers",
      description: `Increases the level of Vijnana-Phala Mine by 3.\n\nMaximum upgrade level is 15.`,
    },
    {
      level: 6,
      title: "Karma Adjudged From the Leaden Fruit",
      description: `Wreath Arrow's charging time is decreased by 0.9s, and will produce 1 additional Clusterbloom Arrow upon hit. This arrow deals 150% of Tighnari's ATK as DMG.`,
    },
  ],
};

export default Character.parse(tighnari);

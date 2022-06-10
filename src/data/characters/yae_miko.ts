import type { Character } from "@/data/types/character";
import { Rarity, Vision, Weapon } from "@/data/types/genshin";

const yae_miko: Character = {
  id: "yae_miko",

  name: "Yae Miko",
  description: `Lady Guuji of the Grand Narukami Shrine. Also serves as the editor-in-chief of Yae Publishing House. Unimaginable intelligence and cunning are hidden under her beautiful appearance.`,
  birthday: [27, 5],

  rarity: Rarity.FIVE_STAR,

  vision: Vision.ELECTRO,
  weapon: Weapon.CATALYST,

  constellations: [
    {
      level: 1,
      title: "Yakan Offering",
      description: `Each time Great Secret Art: Tenko Kenshin activates a Tenko Thunderbolt, Yae Miko will restore 8 Elemental Energy for herself.`,
    },
    {
      level: 2,
      title: "Fox's Mooncall",
      description: `Sesshou Sakura start at Level 2 when created, their max level is increased to 4, and their attack range is increased by 60%.`,
    },
    {
      level: 3,
      title: "The Seven Glamours",
      description: `Increases the Level of Yakan Evocation: Sesshou Sakura by 3. Maximum ugprade level is 15.`,
    },
    {
      level: 4,
      title: "Sakura Channeling",
      description: `When Sesshou Sakura lightning hits opponents, the Electro DMG Bonus of all nearby party members is increased by 20% for 5s.`,
    },
    {
      level: 5,
      title: "Mischievous Teasing",
      description: `Increases the Level of Great Secret Art: Tenko Kenshin by 3. Maximum upgrade level is 15.`,
    },
    {
      level: 6,
      title: "Forbidden Art: Daisesshou",
      description: `The Sesshou Sakura's attacks will ignore 60% of the opponent's DEF.`,
    },
  ],

  story: [],
};

export default yae_miko;

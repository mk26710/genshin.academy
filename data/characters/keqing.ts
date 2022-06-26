import { Rarity, Vision, Weapon } from "@/data/types/genshin";
import { Character } from "@/data/character";

const keqing: Character = {
  id: `keqing`,
  accentColor: `#c8a5fa`,

  name: `Keqing`,
  description: `The Yuheng of the Liyue Qixing. Keqing has much to say about Rex Lapis's unilateral approach to policymaking in Liyue — but in truth, gods admire skeptics such as her quite a lot.`,
  birthday: [20, 11],

  rarity: Rarity.FIVE_STAR,
  vision: Vision.ELECTRO,
  weapon: Weapon.SWORD,

  constellations: [
    {
      level: 1,
      title: `Thundering Might`,
      description: `Recasting Stellar Restoration while a Lightning Stiletto is present causes Keqing to deal 50% of her ATK as AoE Electro DMG at the start point and terminus of her Blink`,
    },
    {
      level: 2,
      title: `Keen Extraction`,
      description: `When Keqing's Normal and Charged Attacks hit opponents affected by Electro, they have a 50% chance of producing an Elemental Particle.\nThis effect can only occur once every 5s.`,
    },
    {
      level: 3,
      title: `Foreseen Reformation`,
      description: `Increases the Level of Starward Sword by 3.\nMaximum upgrade level is 15.`,
    },
    {
      level: 4,
      title: `Attunement`,
      description: `For 10s after Keqing triggers an Electro-related Elemental Reaction, her ATK is increased by 25%.`,
    },
    {
      level: 5,
      title: `Beckoning Stars`,
      description: `Increases the Level of Stellar Restoration by 3.\nMaximum upgrade level is 15.`,
    },
    {
      level: 6,
      title: `Tenacious Star`,
      description: `When initiating a Normal Attack, a Charged Attack, Elemental Skill or Elemental Burst, Keqing gains a 6% Electro DMG Bonus for 8s.\nEffects triggered by Normal Attacks, Charged Attacks, Elemental Skills and Elemental Bursts are considered independent entities.`,
    },
  ],

  story: [],
};

export default Character.parse(keqing);

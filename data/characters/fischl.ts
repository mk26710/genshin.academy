import type { CharacterType } from "../character";

import { Character } from "../character";
import { Rarity, Vision, Weapon } from "../types/genshin";

const fischl: CharacterType = {
  id: `fischl`,
  accentColor: `#9b7ed5`,

  name: `Fischl`,
  description: `A mysterious girl who calls herself "Prinzessin der Verurteilung" and travels with a night raven named Oz.`,
  birthday: [27, 5],

  rarity: Rarity.FOUR_STAR,
  vision: Vision.ELECTRO,
  weapon: Weapon.BOW,

  constellations: [
    {
      level: 1,
      title: `Gaze of the Deep`,
      description: `Even when Oz is not present in combat, he can still watch over Fischl through his raven eyes. When Fischl performs a Normal Attack against an opponent, Oz fires a joint attack, dealing DMG equal to 22% of Fischl's ATK.`,
    },
    {
      level: 2,
      title: `Devourer of All Sins`,
      description: `When Nightrider is used, it deals an additional 200% ATK as DMG, and its AoE is increased by 50%.`,
    },
    {
      level: 3,
      title: `Wings of Nightmare`,
      description: `Increases the Level of Nightrider by 3.\nMaximum upgrade level is 15.`,
    },
    {
      level: 4,
      title: `Her Pilgrimage of Bleak`,
      description: `When Midnight Phantasmagoria is used, it deals 222% of ATK as Electro DMG to surrounding opponents.\nWhen the skill duration ends, Fischl regenerates 20% of her HP.`,
    },
    {
      level: 5,
      title: `Against the Fleeing Light`,
      description: `Increases the Level of Midnight Phantasmagoria by 3.\nMaximum upgrade level is 15.`,
    },
    {
      level: 6,
      title: `Evernight Raven`,
      description: `Extends the duration of Oz's presence on the field by 2s. Additionally, Oz performs joint attacks with your active character when present, dealing 30% of Fischl's ATK as Electro DMG.`,
    },
  ],

  story: [],
};

export default Character.parse(fischl);

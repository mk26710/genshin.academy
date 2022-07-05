import type { CharacterType } from "../character";

import { Character } from "../character";
import { Rarity, Vision, Weapon } from "../types/genshin";

const zhongli: CharacterType = {
  id: `zhongli`,
  accentColor: `#f18c37`,

  name: `Zhongli`,
  description: `A mysterious expert contracted by the Wangsheng Funeral Parlor. Extremely knowledgeable in all things.`,
  birthday: [31, 12],

  rarity: Rarity.FIVE_STAR,
  vision: Vision.GEO,
  weapon: Weapon.POLEARM,

  constellations: [
    {
      level: 1,
      title: `Rock, the Backbone of Earth`,
      description: `Increases the maximum number of Stone Steles created by Dominus Lapidis that may exist simultaneously to 2.`,
    },
    {
      level: 2,
      title: `Stone, the Cradle of Jade`,
      description: `Planet Befall grants nearby characters on the field a Jade Shield when it descends.`,
    },
    {
      level: 3,
      title: `Jade, Shimmering through Darkness`,
      description: `Increases the Level of Dominus Lapidis by 3.\nMaximum upgrade level is 15.`,
    },
    {
      level: 4,
      title: `Topaz, Unbreakable and Fearless`,
      description: `Increases Planet Befall's AoE by 20% and increases the duration of Planet Befall's Petrification effect by 2s.`,
    },
    {
      level: 5,
      title: `Lazuli, Herald of the Order`,
      description: `Increases the Level of Planet Befall by 3.\nMaximum upgrade level is 15.`,
    },
    {
      level: 6,
      title: `Chrysos, Bounty of Dominator`,
      description: `When the Jade Shield takes DMG, 40% of that incoming DMG is converted to HP for the current character.\nA single instance of regeneration cannot exceed 8% of that character's Max HP.`,
    },
  ],

  story: [],
};

export default Character.parse(zhongli);

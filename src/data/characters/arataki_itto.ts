import type { CharacterType } from "../character";

import { Character } from "../character";

const arataki_itto: CharacterType = {
  id: `arataki_itto`,
  accentColor: `#6e4685`,

  name: `Arataki Itto`,
  description: `The first and greatest head of the Arataki Gang, famed throughout Inazuma City's Hanamizaka... Wait, what? You've never heard of them? Are you trying to be funny here?`,
  birthday: [1, 6],

  rarity: 5,
  vision: `GEO`,
  weapon: `CLAYMORE`,

  constellations: [
    {
      level: 1,
      title: `Stay a While and Listen Up`,
      description: `After using Royal Descent: Behold, Itto the Evil!, Arataki Itto gains 2 stacks of Superlative Superstrength. After 1s, Itto will gain 1 stack of Superlative Superstrength every 0.5s for 1.5s.`,
    },
    {
      level: 2,
      title: `Gather 'Round, It's a Brawl!`,
      description: `After using Royal Descent: Behold, Itto the Evil!, each party member whose Element is Geo will decrease that skill's CD by 1.5s and restore 6 Energy to Arataki Itto.\nCD can be decreased by up to 4.5s in this manner. Max 18 Energy can be restored in this manner.`,
    },
    {
      level: 3,
      title: `Horns Lowered, Coming Through`,
      description: `Increases the Level of Masatsu Zetsugi: Akaushi Burst! by 3.\nMaximum upgrade level is 15.`,
    },
    {
      level: 4,
      title: `Jailhouse Bread and Butter`,
      description: `When the Raging Oni King state caused by Royal Descent: Behold, Itto the Evil! ends, all nearby party members gain 20% DEF and 20% ATK for 10s.`,
    },
    {
      level: 5,
      title: `10 Years of Hanamizaka Fame`,
      description: `Increases the Level of Royal Descent: Behold, Itto the Evil! by 3.\nMaximum upgrade level is 15.`,
    },
    {
      level: 6,
      title: `Arataki Itto, Present!`,
      description: `Arataki Itto's Charged Attacks deal +70% Crit DMG. Additionally, when he uses Arataki Kesagiri, he has a 50% chance to not consume stacks of Superlative Superstrength.`,
    },
  ],

  story: [],
};

export default Character.parse(arataki_itto);

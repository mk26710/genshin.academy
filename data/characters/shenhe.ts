import { Character } from "../character";
import { Rarity, Vision, Weapon } from "../types/genshin";

const shenhe: Character = {
  id: "shenhe",
  accentColor: "#e8edf3",

  name: "Shenhe",
  description: `An adepti disciple with a most unusual air about her. Having spent much time cultivating in isolation in Liyue's mountains, she has become every bit as cool and distant as the adepti themselves.`,
  birthday: [10, 3],

  rarity: Rarity.FIVE_STAR,

  vision: Vision.CRYO,
  weapon: Weapon.POLEARM,

  constellations: [
    {
      level: 1,
      title: "Clarity of Heart",
      description: `Spring Spirit Summoning can be used 1 more time.`,
    },
    {
      level: 2,
      title: "Centered Spirit",
      description: `Divine Maiden's Deliverance lasts for 6 seconds longer. Active characters within the skill's field deal 15% increased Cryo CRIT DMG.`,
    },
    {
      level: 3,
      title: "Seclusion",
      description: `Increases the Level of Spring Spirit Summoning by 3. Maximum upgrade level is 15.`,
    },
    {
      level: 4,
      title: "Insight",
      description: `When characters under the effect of Icy Quill applied by Shenhe trigger its DMG Bonus effects, Shenhe will gain a Skyfrost Mantra stack:\n· When Shenhe uses Spring Spirit Summoning, she will consume all stacks of Skyfrost Mantra, increasing the DMG of that Spring Spirit Summoning by 5% for each stack consumed.\n· Max 50 stacks. Stacks last for 60s.`,
    },
    {
      level: 5,
      title: "Divine Attainment",
      description: `Increases the Level of Divine Maiden's Deliverance by 3. Maximum upgrade level is 15.`,
    },
    {
      level: 6,
      title: "Mystical Abandon",
      description: `When characters trigger Icy Quill's effects using Normal and Charged Attack DMG, it does not count toward the Trigger Quota.`,
    },
  ],

  story: [],
};

export default Character.parse(shenhe);

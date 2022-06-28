import { Character, CharacterType } from "../character";
import { Rarity, Vision, Weapon } from "../types/genshin";

const jean: CharacterType = {
  id: `jean`,
  accentColor: `#40738c`,

  name: `Jean`,
  description: `The righteous and rigorous Dandelion Knight, and Acting Grand Master of Mondstadt's Knights of Favonius.`,
  birthday: [14, 3],

  rarity: Rarity.FIVE_STAR,
  vision: Vision.ANEMO,
  weapon: Weapon.SWORD,

  constellations: [
    {
      level: 1,
      title: `Spiraling Tempest`,
      description: `Increases the pulling speed of Gale Blade after holding for more than 1s, and increases the DMG dealt by 40%.`,
    },
    {
      level: 2,
      title: `People's Aegis`,
      description: `When Jean picks up an Elemental Orb/Particle, all party members have their Movement SPD and ATK SPD increased by 15% for 15s.`,
    },
    {
      level: 3,
      title: `When the West Wind Arises`,
      description: `Increases the Level of Dandelion Breeze by 3.\nMaximum upgrade level is 15.`,
    },
    {
      level: 4,
      title: `Lands of Dandelion`,
      description: `Within the Field created by Dandelion Breeze, all opponents have their Anemo RES decreased by 40%.`,
    },
    {
      level: 5,
      title: `Outbursting Gust`,
      description: `Increases the Level of Gale Blade by 3.\nMaximum upgrade level is 15`,
    },
    {
      level: 6,
      title: `Lion's Fang, Fair Protector of Mondstadt`,
      description: `Incoming DMG is decreased by 35% within the Field created by Dandelion Breeze. Upon leaving the Dandelion Field, this effect lasts for 3 attacks or 10s.`,
    },
  ],

  story: [],
};

export default Character.parse(jean);

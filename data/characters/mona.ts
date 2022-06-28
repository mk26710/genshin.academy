import { Character, CharacterType } from "../character";
import { Rarity, Vision, Weapon } from "../types/genshin";

const mona: CharacterType = {
  id: `mona`,
  accentColor: `#685092`,

  name: `Mona`,
  description: `A mysterious young astrologer who proclaims herself to be "Astrologist Mona Megistus," and who possesses abilities to match the title. Erudite, but prideful.`,
  birthday: [31, 8],

  rarity: Rarity.FIVE_STAR,
  vision: Vision.HYDRO,
  weapon: Weapon.CATALYST,

  constellations: [
    {
      level: 1,
      title: `Prophecy of Submersion`,
      description: `When any of your own party members hits an opponent affected by an Omen, the effects of Hydro-related Elemental Reactions are enhanced for 8s:\n- Electro-Charged DMG increases by 15%.\n- Vaporize DMG increases by 15%.\n- Hydro Swirl DMG increases by 15%.\n- Frozen duration is extended by 15%.`,
    },
    {
      level: 2,
      title: `Lunar Chain`,
      description: `When a Normal Attack hits, there is a 20% chance that it will be automatically followed by a Charged Attack.\nThis effect can only occur once every 5s.`,
    },
    {
      level: 3,
      title: `Restless Revolution`,
      description: `Increases the Level of Stellaris Phantasm by 3.\nMaximum upgrade level is 15.`,
    },
    {
      level: 4,
      title: `Prophecy of Oblivion`,
      description: `When any party member attacks an opponent affected by an Omen, their CRIT Rate is increased by 15%.`,
    },
    {
      level: 5,
      title: `Mockery of Fortuna`,
      description: `Increases the Level of Mirror Reflection of Doom by 3.\nMaximum upgrade level is 15.`,
    },
    {
      level: 6,
      title: `Rhetorics of Calamitas`,
      description: `Upon entering Illusory Torrent, Mona gains a 60% increase to the DMG of her next Charged Attack per second of movement.\nA maximum DMG Bonus of 180% can be achieved in this manner. The effect lasts for no more than 8s.`,
    },
  ],

  story: [],
};

export default Character.parse(mona);

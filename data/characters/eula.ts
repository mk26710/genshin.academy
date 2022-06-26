import { Rarity, Vision, Weapon } from "@/data/types/genshin";
import { Character } from "@/data/character";

const eula: Character = {
  id: `eula`,
  accentColor: `#c0e2e8`,

  name: `Eula`,
  description: `The Spindrift Knight, a scion of the old aristocracy, and the Captain of the Knights of Favonius Reconnaissance Company. The reason for which a descendant of the ancient nobles might join the Knights remains a great mystery in Mondstadt to this very day.`,
  birthday: [25, 10],

  rarity: Rarity.FIVE_STAR,

  vision: Vision.CRYO,
  weapon: Weapon.CLAYMORE,

  constellations: [
    {
      level: 1,
      title: `Tidal Illusion`,
      description: `Every time Icetide Vortex's Grimheart stacks are consumed, Eula's Physical DMG is increased by 30% for 6s.\nEach stack consumed will increase the duration of this effect by 6s up to a maximum of 18s.`,
    },
    {
      level: 2,
      title: `Lady of Seafoam`,
      description: `Decreases the CD of Icetide Vortex's Holding Mode, rendering it identical to Press CD.`,
    },
    {
      level: 3,
      title: `Lawrence Pedigree`,
      description: `Increases the Level of Glacial Illumination by 3.\nMaximum upgrade level is 15.`,
    },
    {
      level: 4,
      title: `The Obstinacy of One's Inferiors`,
      description: `Lightfall Swords deal 25% increased DMG against opponents with less than 50% HP.`,
    },
    {
      level: 5,
      title: `Chivalric Quality`,
      description: `Increases the Level of Icetide Vortex by 3.\nMaximum upgrade level is 15.`,
    },
    {
      level: 6,
      title: `Noble Obligation`,
      description: `Lightfall Swords created by Glacial Illumination start with 5 stacks of energy. Normal Attacks, Elemental Skills, and Elemental Bursts have a 50% chance to grant the Lightfall Sword an additional stack of energy.`,
    },
  ],

  story: [],
};

export default Character.parse(eula);

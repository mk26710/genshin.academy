import type { CharacterType } from "../character";

import { Character } from "../character";

const kaedehara_kazuha: CharacterType = {
  id: `kaedehara_kazuha`,
  accentColor: `#e35036`,

  name: `Kaedehara Kazuha`,
  description: `A wandering samurai from Inazuma who is currently with Liyue's Crux Fleet. A gentle and carefree soul whose heart hides a great many burdens from the past.`,
  birthday: [29, 10],

  rarity: 5,
  vision: `ANEMO`,
  weapon: `SWORD`,

  constellations: [
    {
      level: 1,
      title: `Scarlet Hills`,
      description: `Decreases Chihayaburu's CD by 10%.\nUsing Kazuha Slash resets the CD of Chihayaburu.`,
    },
    {
      level: 2,
      title: `Yamaarashi Tailwind`,
      description: `The Autumn Whirlwind field created by Kazuha Slash has the following effects:\n- Increases Kaedehara Kazuha's own Elemental Mastery by 200.\n- Increases the Elemental Mastery of characters within the field by 200.\n\nThe Elemental Mastery-increasing effects of this Constellation do not stack.`,
    },
    {
      level: 3,
      title: `Maple Monogatari`,
      description: `Increases the Level of Chihayaburu by 3.\nMaximum upgrade level is 15.`,
    },
    {
      level: 4,
      title: `Oozora Genpou`,
      description: `When Kaedehara Kazuha's Energy is lower than 45, he obtains the following effects:\n- Pressing or Holding Chihayaburu regenerates 3 or 4 Energy for Kaedehara Kazuha, respectively.\n- When gliding, Kaedehara Kazuha regenerates 2 Energy per second.`,
    },
    {
      level: 5,
      title: `Wisdom of Bansei`,
      description: `Increases the Level of Kazuha Slash by 3.\nMaximum upgrade level is 15`,
    },
    {
      level: 6,
      title: `Crimson Momiji`,
      description: `After using Chihayaburu or Kazuha Slash, Kaedehara Kazuha gains an Anemo Infusion for 5s. Additionally, each point of Elemental Mastery will increase the DMG dealt by Kaedehara Kazuha's Normal, Charged, and Plunging Attacks by 0.2%.`,
    },
  ],

  story: [],
};

export default Character.parse(kaedehara_kazuha);

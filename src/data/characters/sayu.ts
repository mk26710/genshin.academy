import type { CharacterType } from "../character.schema";

import { Character } from "../character.schema";

const sayu: CharacterType = {
  id: "sayu",
  accentColor: "#8AA052",

  name: "Sayu",
  description: "A pint-sized ninja attached to the Shuumatsuban, who always seems sleep-deprived.",
  birthday: [19, 10],

  rarity: 4,
  vision: "ANEMO",
  weapon: "CLAYMORE",

  constellations: [
    {
      level: 1,
      title: "Multi-Task no Jutsu",
      description:
        "The Muji-Muji Daruma created by Yoohoo Art: Mujina Flurry will ignore HP limits and can simultaneously attack nearby opponents and heal characters.",
    },
    {
      level: 2,
      title: "Egress Prep",
      description:
        "Yoohoo Art: Fuuin Dash gains the following effects:\n·DMG of Fuufuu Whirlwind Kick in {LAYOUT_MOBILE#Tapping}{LAYOUT_PC#Press}{LAYOUT_PS#Press} Mode increased by 3.3%.\n·Every 0.5s in the Fuufuu Windwheel state will increase the DMG of this Fuufuu Whirlwind Kick by 3.3%. The maximum DMG increase possible through this method is 66%.",
    },
    {
      level: 3,
      title: "Eh, the Bunshin Can Handle It",
      description:
        "Increases the Level of Yoohoo Art: Mujina Flurry by 3.\nMaximum upgrade level is 15.",
    },
    {
      level: 4,
      title: "Skiving: New and Improved",
      description:
        "Sayu recovers 1.2 Energy when she triggers a Swirl reaction.\nThis effect occurs once every 2s.",
    },
    {
      level: 5,
      title: "Speed Comes First",
      description:
        "Increases the Level of Yoohoo Art: Fuuin Dash by 3.\nMaximum upgrade level is 15.",
    },
    {
      level: 6,
      title: "Sleep O'Clock",
      description:
        "The Muji-Muji Daruma created by Sayu's Yoohoo Art: Mujina Flurry will now also benefit from her Elemental Mastery. Each point of Sayu's Elemental Mastery will produce the following effects:\n·Increases the damage dealt by the Muji-Muji Daruma's attacks by 0.2% ATK. A maximum of 400% ATK can be gained via this method.\n·Increases the HP restored by the Muji-Muji Daruma by 3. A maximum of 6,000 additional HP can be restored in this manner.",
    },
  ],

  story: [],
};

export default Character.parse(sayu);

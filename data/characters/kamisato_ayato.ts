import { Character } from "@/data/character";
import { Rarity, Vision, Weapon } from "@/data/types/genshin";

const kamisato_ayato = Character.parse({
  id: "kamisato_ayato",
  accentColor: "#96acdf",

  name: "Kamisato Ayato",
  description: `The young but highly accomplished head of the Yashiro Commission's Kamisato Clan. Cultured and polite, he is a man of many ways and means.`,
  birthday: [26, 3],

  rarity: Rarity.FIVE_STAR,

  vision: Vision.HYDRO,
  weapon: Weapon.SWORD,

  constellations: [
    {
      level: 1,
      title: "Kyouka Fuushi",
      description: `Shunsuiken DMG is increased by 40% against opponents with 50% HP or less.`,
    },
    {
      level: 2,
      title: "World Source",
      description: `Namisen's maximum stack count is increased to 5. When Kamisato Ayato has at least 3 Namisen stacks, his Max HP is increased by 50%.`,
    },
    {
      level: 3,
      title: "To Admire the Flowers",
      description: `Increases the Level of Kamisato Art: Kyouka by 3. Maximum upgrade level is 15.`,
    },
    {
      level: 4,
      title: "Endless Flow",
      description: `After using Kamisato Art: Suiyuu, all nearby party members will have 15% increased Normal Attack SPD for 15s.`,
    },
    {
      level: 5,
      title: "Bansui Ichiro",
      description: `https://wiki.hoyolab.com/pc/genshin/entry/31`,
    },
    {
      level: 6,
      title: "Boundless Origin",
      description: `After using Kamisato Art: Kyouka, Ayato's next Shunsuiken attack will create 2 extra Shunsuiken strikes when they hit opponents, each one dealing 450% of Ayato's ATK as DMG. Both these Shunsuiken attacks will not be affected by Namisen.`,
    },
  ],

  story: [],
});

export default kamisato_ayato;

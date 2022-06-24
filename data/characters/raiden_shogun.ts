import { Character } from "@/data/character";
import { Rarity, Vision, Weapon } from "@/data/types/genshin";

const raiden_shogun = Character.parse({
  id: "raiden_shogun",
  accentColor: "#3f3575",

  name: "Raiden Shogun",
  description: `Her Excellency, the Almighty Narukami Ogosho, who promised the people of Inazuma an unchanging Eternity.`,
  birthday: [26, 6],

  rarity: Rarity.FIVE_STAR,

  vision: Vision.ELECTRO,
  weapon: Weapon.POLEARM,

  constellations: [
    {
      level: 1,
      title: "Ominous Inscription",
      description: `Chakra Desiderata will gather Resolve even faster. When Electro characters use their Elemental Bursts, the Resolve gained is increased by 80%. When characters of other Elemental Types use their Elemental Bursts, the Resolve gained is increased by 20%.`,
    },
    {
      level: 2,
      title: "Steelbreaker",
      description: `While using Musou no Hitotachi and in the Musou Isshin state applied by Secret Art: Musou Shinsetsu, the Raiden Shogun's attacks ignore 60% of opponents' DEF.`,
    },
    {
      level: 3,
      title: "Shinkage Bygones",
      description: `Increases the Level of Secret Art: Musou Shinsetsu by 3.\nMaximum upgrade level is 15.`,
    },
    {
      level: 4,
      title: "Pledge of Propriety",
      description: `When the Musou Isshin state applied by Secret Art: Musou Shinsetsu expires, all nearby party members (excluding the Raiden Shogun) gain 30% bonus ATK for 10s.`,
    },
    {
      level: 5,
      title: "Shogun's Descent",
      description: `Increases the Level of Transcendence: Baleful Omen by 3.\nMaximum upgrade level is 15.`,
    },
    {
      level: 6,
      title: "Wishbearer",
      description: `While in the Musou Isshin state applied by Secret Art: Musou Shinsetsu, attacks by the Raiden Shogun that are considered part of her Elemental Burst will decrease all nearby party members' (not including the Raiden Shogun herself) Elemental Burst CD by 1s when they hit opponents.\nThis effect can trigger once every 1s and can trigger a total of 5 times during Musou Isshin's duration.`,
    },
  ],

  story: [],
});

export default raiden_shogun;

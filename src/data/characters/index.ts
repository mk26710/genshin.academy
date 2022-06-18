import type { Character } from "@/data/character";

import yae_miko from "./yae_miko";
import kamisato_ayaka from "./kamisato_ayaka";
import yelan from "./yelan";
import kamisato_ayato from "./kamisato_ayato";
import qiqi from "./qiqi";
import shenhe from "./shenhe";
import ganyu from "./ganyu";
import eula from "@/data/characters/eula";
import raiden_shogun from "@/data/characters/raiden_shogun";

const _array = [
  yae_miko,
  kamisato_ayaka,
  yelan,
  kamisato_ayato,
  qiqi,
  shenhe,
  ganyu,
  eula,
  raiden_shogun,
];

export const charactersArray = [..._array].sort(
  (a, b) => a.name.localeCompare(b.name) || b.rarity - a.rarity,
);

export const charactersMap = charactersArray.reduce<Map<string, Character>>((map, current) => {
  map.set(current.id, current);
  return map;
}, new Map());

export const charactersIDs = charactersArray.reduce<string[]>((arr, current) => {
  return [...arr, current.id];
}, []);

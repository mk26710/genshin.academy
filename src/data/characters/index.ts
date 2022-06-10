import type { Character } from "@/data/types/character";

import yae_miko from "@/data/characters/yae_miko";
import kamisato_ayaka from "@/data/characters/kamisato_ayaka";
import yelan from "@/data/characters/yelan";

const _array = [yae_miko, kamisato_ayaka, yelan];

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

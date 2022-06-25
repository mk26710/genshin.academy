import yae_miko from "@/data/characters/yae_miko";
import kamisato_ayaka from "@/data/characters/kamisato_ayaka";
import yelan from "@/data/characters/yelan";
import kamisato_ayato from "@/data/characters/kamisato_ayato";
import qiqi from "@/data/characters/qiqi";
import shenhe from "@/data/characters/shenhe";
import ganyu from "@/data/characters/ganyu";
import eula from "@/data/characters/eula";
import raiden_shogun from "@/data/characters/raiden_shogun";
import yoimiya from "@/data/characters/yoimiya";
import keqing from "@/data/characters/keqing";
import kaedehara_kazuha from "@/data/characters/kaedehara_kazuha";

const _array = Object.freeze([
  yae_miko,
  kamisato_ayaka,
  yelan,
  kamisato_ayato,
  qiqi,
  shenhe,
  ganyu,
  eula,
  raiden_shogun,
  yoimiya,
  keqing,
  kaedehara_kazuha,
]);

export const charactersArray = Object.freeze(
  [..._array].sort((a, b) => a.name.localeCompare(b.name) || b.rarity - a.rarity),
);

export const getCharacterById = (id: string) => _array.find((c) => c.id === id);

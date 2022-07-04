import type { CharacterType } from "../character";

import { Rarity } from "../types/genshin";
import albedo from "./albedo";
import amber from "./amber";
import arataki_itto from "./arataki_itto";
import barbara from "./barbara";
import diluc from "./diluc";
import diona from "./diona";
import eula from "./eula";
import fischl from "./fischl";
import ganyu from "./ganyu";
import gorou from "./gorou";
import hu_tao from "./hu_tao";
import jean from "./jean";
import kaedehara_kazuha from "./kaedehara_kazuha";
import kaeya from "./kaeya";
import kamisato_ayaka from "./kamisato_ayaka";
import kamisato_ayato from "./kamisato_ayato";
import keqing from "./keqing";
import klee from "./klee";
import kujou_sara from "./kujou_sara";
import lisa from "./lisa";
import mona from "./mona";
import ningguang from "./ningguang";
import qiqi from "./qiqi";
import raiden_shogun from "./raiden_shogun";
import razor from "./razor";
import rosaria from "./rosaria";
import sangonomiya_kokomi from "./sangonomiya_kokomi";
import sayu from "./sayu";
import shenhe from "./shenhe";
import sucrose from "./sucrose";
import tartaglia from "./tartaglia";
import venti from "./venti";
import xiao from "./xiao";
import yae_miko from "./yae_miko";
import yanfei from "./yanfei";
import yelan from "./yelan";
import yoimiya from "./yoimiya";
import yun_jin from "./yun_jin";
import zhongli from "./zhongli";

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
  sangonomiya_kokomi,
  rosaria,
  amber,
  fischl,
  klee,
  jean,
  mona,
  hu_tao,
  kujou_sara,
  tartaglia,
  venti,
  arataki_itto,
  diluc,
  zhongli,
  albedo,
  xiao,
  lisa,
  yun_jin,
  barbara,
  diona,
  yanfei,
  sayu,
  sucrose,
  razor,
  kaeya,
  gorou,
  ningguang,
]);

export const charactersArray = Object.freeze(
  _array
    .reduce((acc, item) => {
      if (item.rarity === Rarity.FIVE_STAR) {
        acc[0].push(item);
      }

      if (item.rarity === Rarity.FOUR_STAR) {
        acc[1].push(item);
      }

      return acc;
    }, new Array<CharacterType[]>([], []))
    .reduce((acc, item) => {
      return [...acc, ...item.sort((a, b) => a.name.localeCompare(b.name))];
    }, []),
);

export const getCharacterById = (id: string) => _array.find((c) => c.id === id);

import { CharacterType } from "../character";
import { Rarity } from "../types/genshin";
import amber from "./amber";
import eula from "./eula";
import fischl from "./fischl";
import ganyu from "./ganyu";
import kaedehara_kazuha from "./kaedehara_kazuha";
import kamisato_ayaka from "./kamisato_ayaka";
import kamisato_ayato from "./kamisato_ayato";
import keqing from "./keqing";
import qiqi from "./qiqi";
import raiden_shogun from "./raiden_shogun";
import rosaria from "./rosaria";
import sangonomiya_kokomi from "./sangonomiya_kokomi";
import shenhe from "./shenhe";
import yae_miko from "./yae_miko";
import yelan from "./yelan";
import yoimiya from "./yoimiya";

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

import type { CharacterType } from "@/data/character";
import type { FC } from "react";

import NextLink from "next/link";

import { Rarity } from "@/data/types/genshin";

interface Props {
  character: CharacterType;
}

export const CharacterCard: FC<Props> = ({ character }) => {
  const elementSrc = `/img/elements/${character.vision.toLowerCase()}/icon.webp`;
  const iconSrc = `/img/characters/${character.id}/icon.png`;

  const fontSize =
    /\s+/.test(character.name) && character.name.length > 10 ? `card-long-title` : ``;

  const iconBg = () => {
    if (character.rarity === Rarity.FIVE_STAR) {
      return `from-[#945C2C] to-[#B27330]`;
    } else if (character.rarity === Rarity.FOUR_STAR) {
      return `from-[#5E5789] to-[#9C75B7]`;
    }
    return `from-[#6A6D74] to-[#868586]`;
  };

  return (
    <>
      <NextLink href={`/characters/${character.id}`}>
        <a className="card card-vertical w-[calc(33.33%-0.75rem)] md:w-28">
          <div className="bg-black-900 box-border absolute -ml-[10px] -mt-[10px] rounded-full aspect-square w-8 flex items-center justify-center">
            <img
              src={elementSrc}
              alt="Element icon"
              className="w-5 h-5 aspect-square object-contain object-center"
            />
          </div>
          <div className={`w-full aspect-square rounded-t-lg bg-gradient-to-b ` + iconBg()}>
            <img className="card-thumbnail" src={iconSrc} alt={`${character.name} icon`} />
          </div>

          <div className="w-full h-9 flex items-center justify-center font-semibold">
            <p className={`p-1 text-[.9rem] text-center ` + fontSize}>{character.name}</p>
          </div>
        </a>
      </NextLink>
    </>
  );
};

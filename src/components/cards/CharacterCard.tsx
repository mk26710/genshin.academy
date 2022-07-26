import type { CharacterType } from "@/data/character";
import type { FC } from "react";

import NextLink from "next/link";

import { StaticPicture } from "@/components/StaticPicture";

interface Props {
  character: CharacterType;
  className?: string;
}

export const CharacterCard: FC<Props> = ({ character, className }) => {
  const elementSrc = `/img/elements/${character.vision.toLowerCase()}/icon.webp`;
  const iconSrc = `/img/characters/${character.id}/icon.webp`;

  const iconBg = () => {
    if (character.rarity === 5) {
      return "from-[#945C2C] to-[#B27330]";
    } else if (character.rarity === 4) {
      return "from-[#5E5789] to-[#9C75B7]";
    }
    return "from-[#6A6D74] to-[#868586]";
  };

  return (
    <div className={`w-[calc(33.33%-0.75rem)] lg:w-28 ${className}`}>
      <NextLink href={`/characters/${character.id}`}>
        <a className="card card-vertical">
          <div className="absolute -ml-[10px] -mt-[10px] box-border flex aspect-square w-8 items-center justify-center rounded-full bg-dark-900">
            <StaticPicture
              src={elementSrc}
              alt="Element src"
              className="aspect-square h-5 w-5 object-contain object-center"
            />
          </div>
          <div className={"aspect-square w-full rounded-t-lg bg-gradient-to-b " + iconBg()}>
            <StaticPicture
              className="card-thumbnail"
              src={iconSrc}
              alt={`${character.name} icon`}
            />
          </div>

          <div className="flex h-full w-full items-center justify-center py-1 text-[.9rem] font-semibold text-[#000] dark:text-dark-300 ">
            <p className="p-1 text-center leading-none">{character.name}</p>
          </div>
        </a>
      </NextLink>
    </div>
  );
};

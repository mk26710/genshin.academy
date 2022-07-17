import type { CharacterType } from "@/data/character";
import type { FC } from "react";

import { StaticPicture } from "@/components/StaticPicture";
import Link from "@/i18n/Link";

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
      <Link href={`/characters/${character.id}`}>
        <a className="card card-vertical">
          <div className="bg-dark-900 box-border absolute -ml-[10px] -mt-[10px] rounded-full aspect-square w-8 flex items-center justify-center">
            <StaticPicture
              src={elementSrc}
              alt="Element src"
              className="w-5 h-5 aspect-square object-contain object-center"
            />
          </div>
          <div className={"w-full aspect-square rounded-t-lg bg-gradient-to-b " + iconBg()}>
            <StaticPicture
              className="card-thumbnail"
              src={iconSrc}
              alt={`${character.name} icon`}
            />
          </div>

          <div className="w-full py-1 h-full flex items-center justify-center font-semibold text-[.9rem] text-[#000] dark:text-dark-300 ">
            <p className="p-1 text-center leading-none">{character.name}</p>
          </div>
        </a>
      </Link>
    </div>
  );
};

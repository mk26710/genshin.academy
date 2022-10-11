import type { FC } from "react";

import { Link } from "@remix-run/react";

import { StaticPicture } from "~/components/StaticPicture";
import type { GenshinCharacter, GenshinCharacterIdentity } from "#prisma/client";

interface Props {
  character: {
    id: GenshinCharacter["id"];
    rarity: GenshinCharacter["rarity"];
    vision: GenshinCharacter["vision"];
    identity: Array<{
      name: GenshinCharacterIdentity["name"];
    }>;
    [key: string]: unknown;
  };
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
      <Link
        className="card block p-0 transition-all duration-200 hover:shadow-lg "
        to={`/characters/${character.id}`}
      >
        <div className="absolute -ml-[10px] -mt-[10px] box-border flex aspect-square w-8 items-center justify-center rounded-full bg-dark-900 dark:bg-black">
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
            alt={`${character.identity.at(0)?.name} icon`}
          />
        </div>

        <div className="flex h-full w-full items-center justify-center py-1 text-[.9rem] font-semibold">
          <p className="p-1 text-center leading-none">{character.identity.at(0)?.name}</p>
        </div>
      </Link>
    </div>
  );
};

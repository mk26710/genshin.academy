import { FC } from "react";
import NextLink from "next/link";
import { Rarity } from "@/data/types/genshin";

interface Props {
  id: string;
  name: string;
  rarity: Rarity;
}

export const CharacterCard: FC<Props> = ({ id, name, rarity }) => {
  const iconSrc = `/img/characters/${id}/icon.png`;

  const iconBg = () => {
    if (rarity === Rarity.FIVE_STAR) {
      return "from-[#945C2C] to-[#B27330]";
    } else if (rarity === Rarity.FOUR_STAR) {
      return "from-[#5E5789] to-[#9C75B7]";
    }
    return "from-[#6A6D74] to-[#868586]";
  };

  const fontSize = /\s+/.test(name) && name.length > 10 ? "long-title" : "";

  return (
    <>
      <NextLink href={`/characters/${id}`}>
        <a className="card card-vertical w-[calc(33.33%-0.75rem)] md:w-28">
          <div className={"w-full aspect-square rounded-t-lg bg-gradient-to-b " + iconBg()}>
            <img className="card-thumbnail" src={iconSrc} alt={`${name} icon`} />
          </div>

          <div className="w-full h-8 flex items-center justify-center font-semibold">
            <p className={"p-1 text-[.9rem] text-center " + fontSize}>{name}</p>
          </div>
        </a>
      </NextLink>
    </>
  );
};

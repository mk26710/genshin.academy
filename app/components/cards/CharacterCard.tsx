import type { CharacterAsset, Element as TeyvatElement } from "@prisma/client";
import type { ComponentPropsWithoutRef, FC, PropsWithChildren } from "react";
import type { To } from "react-router-dom";

import { Link } from "@remix-run/react";

import { Paper } from "~/components/Paper";
import { StaticPicture } from "~/components/StaticPicture";

type RootProps = {
  className?: string;
  to: To;
  id: string;
  name: string;
  element?: TeyvatElement | null;
  rarity?: number;
};

const CharacterRoot: FC<PropsWithChildren<RootProps>> = ({
  to,
  className,
  children,
  ...character
}) => {
  const elementSrc = `/img/elements/${character.element}/icon.webp`.toLowerCase();

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
      <Paper
        as={Link}
        to={to}
        className="relative z-0 block p-0 before:absolute before:top-0 before:bottom-0 before:z-[-1] before:h-full before:w-full before:rounded-lg before:bg-inherit before:transition-all hover:shadow-lg dark:before:hover:brightness-125"
      >
        {character.element != null && (
          <div className="absolute -ml-[10px] -mt-[10px] box-border flex aspect-square w-8 items-center justify-center rounded-full bg-dark-900 dark:bg-black">
            <StaticPicture
              src={elementSrc}
              alt="Element src"
              className="aspect-square h-5 w-5 object-contain object-center"
            />
          </div>
        )}

        <div className={"aspect-square w-full rounded-t-lg bg-gradient-to-b " + iconBg()}>
          {children}
        </div>

        <div className="flex h-full w-full items-center justify-center py-1 text-[.9rem] font-semibold">
          <p className="p-1 text-center leading-none dark:text-dark-100">{character.name}</p>
        </div>
      </Paper>
    </div>
  );
};

type CharacterCardIconProps = {
  assets?: CharacterAsset[];
} & ComponentPropsWithoutRef<"img">;

const CharacterCardIcon: FC<CharacterCardIconProps> = ({ assets, src, ...props }) => {
  const iconObjectS3 = src ?? assets?.find((entry) => entry.type === "ICON")?.url;

  return <img src={iconObjectS3} {...props} />;
};

export const CharacterCard = Object.assign(CharacterRoot, { Icon: CharacterCardIcon });

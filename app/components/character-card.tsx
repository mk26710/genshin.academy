import type { Element as GenshinElement } from "@prisma/client";
import type { To } from "@remix-run/router";
import type { FC } from "react";
import type { Nil } from "~/types/common";

import { Link } from "@remix-run/react";
import { clsx } from "clsx";

import {
  AnemoIcon,
  CryoIcon,
  DendroIcon,
  ElectroIcon,
  GeoIcon,
  HydroIcon,
  PyroIcon,
} from "./icons/genshin/elements";

type CharacterCardProps = {
  to?: To;
  iconUrl?: string;
  name?: string;
  rarity?: number;
  element?: Nil<GenshinElement>;
  className?: string;
};

export const CharacterCard: FC<CharacterCardProps> = ({
  to,
  iconUrl,
  name,
  rarity,
  element,
  className,
}) => {
  const Wrapper = to != null ? Link : "div";

  return (
    <Wrapper
      to={to ?? ""}
      className={clsx("daisy-card relative rounded-box bg-base-200", className)}
    >
      {element != null && (
        <div className="absolute -top-[10px] -left-[10px] flex h-8 w-8 items-center justify-center rounded-full bg-black">
          {element === "ANEMO" && <AnemoIcon className="h-5 w-5 text-[#33d7a0]" />}
          {element === "ELECTRO" && <ElectroIcon className="h-5 w-5 text-[#cc80ff]" />}
          {element === "CRYO" && <CryoIcon className="h-5 w-5 text-[#7af2f2]" />}
          {element === "DENDRO" && <DendroIcon className="h-5 w-5 text-[#9be53d]" />}
          {element === "PYRO" && <PyroIcon className="h-5 w-5 text-[#ff6640]" />}
          {element === "HYDRO" && <HydroIcon className="h-5 w-5 text-[#00c0ff]" />}
          {element === "GEO" && <GeoIcon className="h-5 w-5 text-[#ffb00d]" />}
        </div>
      )}

      <figure
        className={clsx(
          "rounded-t-box bg-gradient-to-b",
          rarity === 5
            ? "from-[#945C2C] to-[#B27330]"
            : rarity === 4
            ? "from-[#5E5789] to-[#9C75B7]"
            : "from-[#6A6D74] to-[#868586]",
        )}
      >
        <img src={iconUrl} className="aspect-square" />
      </figure>

      <div className="daisy-card-body grid place-items-center p-0">
        <h4 className="p-0.5 text-sm font-semibold">{name}</h4>
      </div>
    </Wrapper>
  );
};

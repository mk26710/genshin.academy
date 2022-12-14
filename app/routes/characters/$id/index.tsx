import type { ContextType } from "../$id";

import { CakeIcon, EyeIcon, SparklesIcon } from "@heroicons/react/20/solid";
import { useOutletContext } from "@remix-run/react";

import { OverviewIcon } from "~/components/character/OverviewIcon";
import { Rarity } from "~/components/character/Rarity";
import { useVisitorLocale } from "~/hooks/use-visitor-locale";

export default function CharacterOverview() {
  const { info } = useOutletContext<ContextType>();

  const locale = useVisitorLocale();

  const elementIcon = `/img/elements/${info.details.element?.toLowerCase()}/icon.webp`;

  const gachaIconS3 = info.details.assets.find((entry) => entry.type === "GACHA")?.url;
  const gachaIcon = gachaIconS3 ?? `/img/characters/${info.details.id}/avatar.webp`;

  const birthDate = new Date(`2000-${info.details.birthMonth}-${info.details.birthDay}`);

  return (
    <div className="flex flex-row items-start">
      <div className="flex flex-1 flex-col">
        <img src={gachaIcon} className="block h-auto w-auto lg:hidden" />
        <span className="flex flex-row items-center justify-center gap-2 lg:items-start lg:justify-start">
          <img
            src={elementIcon}
            alt={info.details.element + " icon"}
            className="h-8 w-8 object-cover"
          />
          <h2 className="text-4xl font-semibold dark:text-dark-50">{info.name}</h2>
        </span>
        <p className="mt-4">{info.description}</p>

        <div className="mt-6 grid grid-flow-dense auto-rows-min grid-cols-1 gap-2 xs:grid-cols-2 md:grid-cols-3">
          <div className="flex items-center gap-2">
            <OverviewIcon as={CakeIcon} />
            <span>{birthDate.toLocaleDateString(locale, { day: "numeric", month: "long" })}</span>
          </div>

          <div className="flex items-center gap-2">
            <OverviewIcon as={SparklesIcon} />
            <span>
              <Rarity rarity={info.details.rarity} />
            </span>
          </div>

          <div className="flex items-center gap-2">
            <OverviewIcon as={EyeIcon} />
            <span className="capitalize">{info.details.element?.toLowerCase()}</span>
          </div>
        </div>
      </div>
      <img src={gachaIcon} className="hidden h-[500px] w-auto lg:block" />
    </div>
  );
}

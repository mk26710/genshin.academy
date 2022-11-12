import type { ContextType } from "../$id";

import { CakeIcon } from "@heroicons/react/24/outline";
import { useOutletContext } from "@remix-run/react";

import { useVisitorLocale } from "~/hooks/use-visitor-locale";

export default function CharacterOverview() {
  const { data, identity } = useOutletContext<ContextType>();

  const locale = useVisitorLocale();

  const elementIcon = `/img/elements/${data.vision.toLowerCase()}/icon.webp`;

  const gachaIconS3 = data.assets.find((entry) => entry.type === "GACHA")?.url;
  const gachaIcon = gachaIconS3 ?? `/img/characters/${data.id}/avatar.webp`;

  const birthDate = new Date(`2000-${data.birthMonth}-${data.birthDay}`);

  return (
    <div className="flex flex-row items-start">
      <div className="flex flex-1 flex-col">
        <img src={gachaIcon} className="block h-auto w-auto lg:hidden" />
        <span className="flex flex-row items-center justify-center gap-2 lg:items-start lg:justify-start">
          <img src={elementIcon} alt={data.vision + " icon"} className="h-8 w-8 object-cover" />
          <h2 className="text-4xl font-semibold ">{identity.name}</h2>
        </span>
        <p className="mt-4">{identity.description}</p>

        <div className="mt-6 flex flex-row flex-wrap gap-2">
          <div className="flex w-[33.33%] items-center gap-2">
            <CakeIcon className="h-6 w-6" />
            <span>{birthDate.toLocaleDateString(locale, { day: "numeric", month: "long" })}</span>
          </div>
        </div>
      </div>
      <img src={gachaIcon} className="hidden h-[500px] w-auto lg:block" />
    </div>
  );
}

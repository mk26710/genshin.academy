import type { GenshinCharacter, GenshinCharacterIdentity } from "@prisma/client";
import type { FunctionComponent } from "react";
import { Link } from "@remix-run/react";
import { useTranslations } from "use-intl";

type BirthdayCardProps = {
  id: GenshinCharacter["id"];
  name: GenshinCharacterIdentity["name"];
};

export const BirthdayCard: FunctionComponent<BirthdayCardProps> = ({ id, name }) => {
  const t = useTranslations();
  const iconUrl = `/img/characters/${id}/icon.webp`;

  return (
    <Link to={`/characters/${id}`} className="card hover:card-shadow flex flex-col p-0 md:flex-row">
      <img src={iconUrl} className="aspect-square rounded-md object-cover md:h-40 md:w-32" />
      <div className="flex h-full w-full flex-col py-2 px-[var(--default-gap)]">
        <h3 className="text-xl font-semibold">{t("common.bday-wish", { name })}</h3>
        <p className="text-sm">{t("common.bday-description", { name })}</p>
      </div>
    </Link>
  );
};

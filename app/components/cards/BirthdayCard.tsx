import type { GenshinCharacter, GenshinCharacterIdentity } from "@prisma/client";
import type { FunctionComponent } from "react";

import { Link } from "@remix-run/react";
import { useTranslations } from "use-intl";

import { Paper } from "~/components/Paper";

type BirthdayCardProps = {
  id: GenshinCharacter["id"];
  name: GenshinCharacterIdentity["name"];
  iconUrl?: string;
};

export const BirthdayCard: FunctionComponent<BirthdayCardProps> = ({
  id,
  name,
  iconUrl = `/img/characters/${id}/icon.webp`,
}) => {
  const t = useTranslations();

  return (
    <Paper
      as={Link}
      to={`/characters/${id}`}
      className="relative z-0 flex flex-col p-0 before:absolute before:top-0 before:left-0 before:z-[-1] before:h-full before:w-full before:rounded-lg before:transition-all hover:scale-[1.01] hover:shadow-lg dark:before:bg-inherit dark:before:hover:brightness-125 md:flex-row"
    >
      <img src={iconUrl} className="aspect-square rounded-md object-cover md:h-40 md:w-32" />
      <div className="flex h-full w-full flex-col py-2 px-[var(--default-gap)]">
        <h3 className="text-xl font-semibold">{t("common.bday-wish", { name })}</h3>
        <p className="text-sm">{t("common.bday-description", { name })}</p>
      </div>
    </Paper>
  );
};

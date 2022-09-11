import type { FunctionComponent } from "react";

import { useTranslation } from "next-i18next";
import Link from "next/link";

import { StaticPicture } from "@/components/StaticPicture";
import { charactersArray } from "@/data/characters";

const BirthdaysToday: FunctionComponent = () => {
  const { t } = useTranslation();

  const now = new Date();
  const [day, month] = [now.getDate(), now.getMonth() + 1];

  const celebrants = charactersArray.filter((character) => {
    const [birthdayDay, birthdayMonth] = character.birthday;
    return birthdayDay === day && birthdayMonth === month;
  });

  return (
    <div className="card">
      <h1 className="mb-4 text-xl font-semibold text-[#000]">{t`common:birthdays`}</h1>

      <div className="flex flex-wrap gap-2">
        {celebrants.length <= 0 && (
          <div className="flex h-28 w-full items-center justify-center">
            <p className="text-sm opacity-75">{t`birthdays-none`}</p>
          </div>
        )}

        {celebrants.map(({ id, name }, index) => (
          <Link href={`/characters/${id}`} key={index}>
            <a className="block rounded-lg border border-gray-200 bg-gray-100">
              <StaticPicture
                className="h-28 w-28 rounded-lg"
                src={`/img/characters/${id}/icon.webp`}
                alt={`${name} Icon`}
              />
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BirthdaysToday;

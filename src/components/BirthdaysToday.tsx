import type { FunctionComponent } from "react";

import dayjs from "dayjs";
import Link from "next/link";

import { StaticPicture } from "@/components/StaticPicture";
import { charactersArray } from "@/data/characters";

const BirthdaysToday: FunctionComponent = () => {
  const now = dayjs();
  const [day, month] = [now.date(), now.month() + 1];

  const celebrants = charactersArray.filter((character) => {
    const [birthdayDay, birthdayMonth] = character.birthday;
    return birthdayDay === day && birthdayMonth === month;
  });

  return (
    <div className="box-border flex flex-col rounded-lg border border-neutral-200 bg-white p-4 text-sm text-neutral-700 dark:border-dark-800 dark:bg-dark-900 dark:text-dark-400">
      <h1 className="mb-4 text-xl font-semibold text-[#000] dark:text-dark-300">
        {celebrants.length > 0 ? "🎉 Happy Birthday!" : "Character Birthdays"}
      </h1>

      {celebrants.length <= 0 && <>There are no birthdays today :&#40;</>}

      {celebrants.length > 0 && (
        <>
          <div className="flex flex-wrap gap-2">
            {celebrants.map(({ id, name }, index) => (
              <Link href={`/characters/${id}`} key={index}>
                <a className="block h-24  w-24 rounded-lg border border-neutral-200 bg-neutral-100 dark:border-dark-800 dark:bg-dark-950">
                  <StaticPicture
                    className="rounded-lg"
                    src={`/img/characters/${id}/icon.webp`}
                    alt={`${name} Icon`}
                  />
                </a>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default BirthdaysToday;

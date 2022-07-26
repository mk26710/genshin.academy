import type { FunctionComponent } from "react";

import dayjs from "dayjs";
import Link from "next/link";

import { charactersArray } from "@/data/characters";

const BirthdaysToday: FunctionComponent = () => {
  const now = dayjs();
  const [day, month] = [now.date(), now.month() + 1];

  const celebrant = charactersArray.find((character) => {
    const [birthdayDay, birthdayMonth] = character.birthday;
    return birthdayDay === day && birthdayMonth === month;
  });

  return (
    <div className="box-border flex flex-col rounded-lg border border-neutral-200 bg-white p-4 dark:border-dark-800 dark:bg-dark-900">
      <h1 className="mb-4 text-xl font-semibold text-[#000] dark:text-dark-300">
        {celebrant == null && <>Characters Birthdays</>}
        {celebrant != null && <>Happy Birthday 🎉</>}
      </h1>

      {celebrant == null && <>There are no birthdays today :&#40;</>}

      {celebrant != null && (
        <>
          <div>
            <Link key={`bd-${celebrant.id}`} href={`/characters/${celebrant.id}`}>
              <a className="flex justify-center rounded-lg bg-neutral-100 outline outline-1 outline-neutral-200 dark:bg-dark-900 dark:outline-dark-200/10">
                <img
                  className="rounded-lg object-cover object-center"
                  src={`/img/characters/${celebrant.id}/icon.webp`}
                  alt={`${celebrant.name} icon`}
                />
              </a>
            </Link>
          </div>

          <section className="mt-2 text-justify">
            <p>Today is a special day! It&apos;s a birthday of {celebrant.name}!</p>
            <p>
              Make sure to grab your gift and read the letter in game. See what they have prepared
              for you :&#41;
            </p>
          </section>
        </>
      )}
    </div>
  );
};

export default BirthdaysToday;

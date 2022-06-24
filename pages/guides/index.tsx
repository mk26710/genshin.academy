import { type ChangeEvent, useState } from "react";
import Head from "next/head";
import { NextPage } from "next";
import { debounce } from "lodash-es";

import { GuideCard } from "@/components/cards/GuideCard";
import { MainLayout } from "@/components/MainLayout";

import { charactersArray } from "@/data/characters";
import published from "@/data/guides/compiled/characters/published.json";

// this doesn't need to be reactive
const publishedCharacters = charactersArray.filter(({ id }) => published.includes(id));

const GuidesIndex: NextPage = () => {
  const [input, setInput] = useState("");

  const handleChange = debounce((e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }, 300);

  return (
    <>
      <Head>
        <title>Guides</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainLayout>
        <input
          type="text"
          placeholder="Search by title"
          onChange={(e) => handleChange(e)}
          className="w-full mb-4 lg:mb-8 leading-6 dark:text-neutral-300 placeholder:text-neutral-600 accent-primary-500 rounded-md ring-1 bg-white dark:bg-neutral-800 ring-neutral-900/10 dark:ring-neutral-50/10 shadow-sm py-1.5 pl-2 pr-3"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
          {publishedCharacters.map((character) => (
            <GuideCard
              key={character.id}
              href={`/guides/${character.id}`}
              title={character.name}
              description={character.description}
              thumbnail={`/img/characters/${character.id}/avatar_header.webp`}
              className={
                !character.name.toLowerCase().includes(input.toLowerCase()) ? "!hidden" : ""
              }
            />
          ))}
        </div>
      </MainLayout>
    </>
  );
};

export default GuidesIndex;

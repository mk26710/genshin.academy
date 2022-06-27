import { type ChangeEvent, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { NextPage } from "next";
import { debounce, isEmpty } from "lodash-es";

import { Layout } from "@/components/Layout";
import { GuideCard } from "@/components/cards/GuideCard";
import { Container } from "@/components/Container";
import { RouterReady } from "@/components/RouterReady";

import { charactersArray } from "@/data/characters";
import published from "@/data/guides/compiled/characters/published.json";

// this doesn't need to be reactive
const publishedCharacters = charactersArray.filter(({ id }) => published.includes(id));

const GuidesIndex: NextPage = () => {
  const router = useRouter();

  const { q = "" } = router.query;

  const handleChange = debounce((e: ChangeEvent<HTMLInputElement>) => {
    const url = !isEmpty(e.target.value) ? `/guides?q=${e.target.value}` : `/guides`;
    router.replace(url, undefined, { shallow: true });
  }, 300);

  return (
    <Layout title="Guides" description="Genshin Impact characters' playstyle, builds and etc.">
      <Container>
        <RouterReady>
          <input
            type="text"
            placeholder="Search by title"
            onChange={handleChange}
            className="w-full mb-4 lg:mb-8 leading-6 dark:text-neutral-300 placeholder:text-neutral-600 accent-primary-500 rounded-md ring-1 bg-white dark:bg-neutral-800 ring-neutral-900/10 dark:ring-neutral-50/10 shadow-sm py-1.5 pl-2 pr-3"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
            {publishedCharacters
              .filter((c) => c.id.includes(q.toString().toLowerCase()))
              .map((character) => (
                <GuideCard
                  key={character.id}
                  id={character.id}
                  href={`/guides/${character.id}`}
                  title={character.name}
                  description={character.description}
                  thumbnail={`/img/characters/${character.id}/avatar_header.webp`}
                />
              ))}
          </div>
        </RouterReady>
      </Container>
    </Layout>
  );
};

export default GuidesIndex;

import type { NextPage } from "next";

import { debounce, isEmpty } from "lodash-es";
import { type ChangeEvent, useEffect, useRef } from "react";

import { GuideCard } from "@/components/cards/GuideCard";
import { Container } from "@/components/Container";
import { Layout } from "@/components/Layout";
import { charactersArray } from "@/data/characters";
import published from "@/data/guides/compiled/characters/published.json";
import { useRouterReady } from "@/hooks/useRouterReady";

// this doesn't need to be reactive
const publishedCharacters = charactersArray.filter(({ id }) => published.includes(id));

const GuidesIndex: NextPage = () => {
  const [ready, router] = useRouterReady();

  const inputRef = useRef<HTMLInputElement>(null);
  const q = router.query.q?.toString() ?? ``;

  const handleChange = debounce((e: ChangeEvent<HTMLInputElement>) => {
    const url = !isEmpty(e.target.value) ? `/guides?q=${e.target.value}` : `/guides`;
    void router.replace(url, undefined, { shallow: true });
  }, 300);

  useEffect(() => {
    const el = inputRef.current;
    if (el) {
      el.value = q;
    }
  }, [ready, q]);

  return (
    <Layout title="Guides" description="Genshin Impact characters' playstyle, builds and etc.">
      <Container>
        {ready && (
          <>
            <input
              ref={inputRef}
              type="text"
              placeholder="Search by title"
              onChange={handleChange}
              className="w-full mb-4 lg:mb-8 leading-6 dark:text-neutral-300 placeholder:text-neutral-600 accent-primary-500 rounded-md ring-1 bg-white dark:bg-neutral-800 ring-neutral-900/10 dark:ring-neutral-50/10 shadow-sm py-1.5 pl-2 pr-3"
            />

            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 2xl:columns-5 gap-4 space-y-4">
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
          </>
        )}
      </Container>
    </Layout>
  );
};

export default GuidesIndex;

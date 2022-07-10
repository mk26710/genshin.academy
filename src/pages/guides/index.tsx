import type { CharacterType } from "@/data/character";
import type { NextPage } from "next";
import type { ChangeEvent } from "react";

import { debounce } from "lodash-es";
import { useEffect, useRef } from "react";

import { GuideCard } from "@/components/cards/GuideCard";
import { Container } from "@/components/Container";
import { Input } from "@/components/Input";
import { Layout } from "@/components/Layout";
import { charactersArray } from "@/data/characters";
import published from "@/data/guides/compiled/published.json";
import { useRouterReady } from "@/hooks/useRouterReady";

type PublishedItem = typeof published[0];

// this doesn't need to be reactive
const publishedGuides = published.reduce((acc, item) => {
  const character = charactersArray.find((c) => c.id === item.id);
  if (character != null) {
    acc.push({ meta: item, character });
  }
  return acc;
}, new Array<{ meta: PublishedItem; character: CharacterType }>());

const GuidesIndex: NextPage = () => {
  const [ready, router] = useRouterReady();

  const inputRef = useRef<HTMLInputElement>(null);
  const q = router.query.q?.toString() ?? "";

  const guideType = router.query.t?.toString() ?? "character";

  const handleInputChange = debounce((e: ChangeEvent<HTMLInputElement>) => {
    void router.replace(
      {
        query: {
          ...router.query,
          q: e.target.value,
        },
      },
      undefined,
      { shallow: true },
    );
  }, 300);

  const handleOptionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    void router.replace(
      {
        query: { ...router.query, t: e.target.value },
      },
      undefined,
      { shallow: true },
    );
  };

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
            <div className="flex flex-col lg:flex-row mb-4 gap-2">
              <select
                value={guideType}
                onChange={handleOptionChange}
                className="w-full lg:w-40 form-select appearance-none block h-10 leading-6 dark:text-dark-300 placeholder:text-neutral-400 dark:placeholder:text-dark-400 accent-primary-500 rounded-lg border border-neutral-200 dark:border-dark-200/10 dark:bg-dark-800 bg-whiteshadow-sm py-1.5 pl-2 pr-3"
              >
                <option value="character">Characters</option>
                <option value="general">General</option>
              </select>

              <Input
                ref={inputRef}
                placeholder="Search by title"
                onChange={handleInputChange}
                fullWidth
              />
            </div>

            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 2xl:columns-5 gap-4 space-y-4">
              {publishedGuides
                .filter((g) => g.meta.type === guideType)
                .filter((g) => g.character.name.toLowerCase().includes(q.toString().toLowerCase()))
                .map((guide) => (
                  <GuideCard
                    key={guide.character.id}
                    id={guide.character.id}
                    href={`/guides/${guide.meta.id}`}
                    title={guide.character.name}
                    description={guide.character.description}
                    thumbnail={`/img/characters/${guide.character.id}/avatar_header.webp`}
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

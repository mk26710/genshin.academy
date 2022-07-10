import type { CharacterType } from "@/data/character";
import type { NextPage } from "next";
import type { NextRouter } from "next/router";
import type { ChangeEvent, FunctionComponent } from "react";

import { useAtom } from "jotai";
import { useHydrateAtoms } from "jotai/utils";
import { debounce, isEmpty } from "lodash-es";
import { useRef, useEffect } from "react";

import { guideSearchQueryAtom, guideSearchTypeAtom } from "@/atoms/guideSearch";
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

const RouterReadyContent: FunctionComponent<{ router: NextRouter }> = ({ router }) => {
  // just realized jotai's hydration can be
  // abused to avoid the useEffects mess
  // and keep atoms in sync with router :o
  useHydrateAtoms([
    [guideSearchQueryAtom, router.query.q ?? ""],
    [guideSearchTypeAtom, router.query.t ?? "character"],
  ]);

  const inputRef = useRef<HTMLInputElement>(null);

  const [input, setInput] = useAtom(guideSearchQueryAtom);
  const [guideType, setGuideType] = useAtom(guideSearchTypeAtom);

  const handleInputChange = debounce((e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }, 200);

  const handleOptionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setGuideType(e.target.value);
  };

  useEffect(() => {
    void router.replace(
      {
        query: {
          ...router.query,
          q: input,
          t: guideType,
        },
      },
      undefined,
      { shallow: true },
    );
  }, [input, guideType]);

  // we need to set input field value if
  // there's predefined input atom value
  useEffect(() => {
    const el = inputRef.current;
    if (el != null) {
      if (isEmpty(el.value) && !isEmpty(input)) {
        el.value = input;
      }
    }
  }, [input]);

  return (
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
          onChange={handleInputChange}
          placeholder="Search by title"
          fullWidth
        />
      </div>

      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 2xl:columns-5 gap-4 space-y-4">
        {publishedGuides
          .filter((g) => g.meta.type === guideType)
          .filter((g) => g.character.name.toLowerCase().includes(input.toString().toLowerCase()))
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
  );
};

const GuidesIndex: NextPage = () => {
  const [ready, router] = useRouterReady();

  return (
    <Layout title="Guides" description="Genshin Impact characters' playstyle, builds and etc.">
      <Container>{ready && <RouterReadyContent router={router} />}</Container>
    </Layout>
  );
};

export default GuidesIndex;

import type { CharacterType } from "@/data/character";
import type { NextPage } from "next";
import type { NextRouter } from "next/router";
import type { ChangeEvent, FunctionComponent } from "react";

import { useAtom } from "jotai";
import { useHydrateAtoms } from "jotai/utils";
import debounce from "lodash.debounce";
import isEmpty from "lodash.isempty";
import useTranslation from "next-translate/useTranslation";
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

interface PublishedGuide {
  meta: PublishedItem;
  character: CharacterType;
}

// this doesn't need to be reactive
const publishedGuides = published.reduce<PublishedGuide[]>((acc, item) => {
  const character = charactersArray.find((c) => c.id === item.id);
  if (character != null) {
    acc.push({ meta: item, character });
  }
  return acc;
}, []);

const NoResult: FunctionComponent = () => {
  return <>There&apos;s nothing here :(</>;
};

const RouterReadyContent: FunctionComponent<{ router: NextRouter }> = ({ router }) => {
  // just realized jotai's hydration can be
  // abused to avoid the useEffects mess
  // and keep atoms in sync with router :o
  useHydrateAtoms([
    [guideSearchQueryAtom, router.query.q ?? ""],
    [guideSearchTypeAtom, router.query.t ?? "all"],
  ]);

  const { t } = useTranslation();

  const inputRef = useRef<HTMLInputElement>(null);

  const [input, setInput] = useAtom(guideSearchQueryAtom);
  const [guideType, setGuideType] = useAtom(guideSearchTypeAtom);

  const filteredGuides = publishedGuides
    .filter((g) => (guideType !== "all" ? g.meta.type === guideType : true))
    .filter((g) => g.character.name.toLowerCase().includes(input.toString().toLowerCase()));

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
          className="form-select w-full lg:w-44 appearance-none block h-10 text-[#000] dark:text-dark-300 rounded-lg border border-neutral-200 dark:border-dark-800 bg-white dark:bg-dark-900 focus:ring-2 focus:ring-primary-500 placeholder:text-neutral-400 dark:placeholder:text-dark-500 font-semibold uppercase"
        >
          <option value="all">All</option>
          <option value="character">Characters</option>
          <option value="general">General</option>
        </select>

        <Input
          ref={inputRef}
          onChange={handleInputChange}
          placeholder={t`common:search-by-title`}
          fullWidth
        />
      </div>

      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 2xl:columns-5 gap-4 space-y-4">
        {filteredGuides.length <= 0 && <NoResult />}
        {filteredGuides.map((guide) => (
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
  const { t } = useTranslation();

  return (
    <Layout title={t("common:guides")} description={t("meta:guides.home.description")}>
      <Container>{ready && <RouterReadyContent router={router} />}</Container>
    </Layout>
  );
};

export default GuidesIndex;

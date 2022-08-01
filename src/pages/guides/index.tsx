import type { CharacterType } from "@/data/character.schema";
import type { MetaType } from "@/data/guides/meta.schema";
import type { GetStaticProps, InferGetStaticPropsType } from "next";
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
import { getCharacterById } from "@/data/characters";
import { publishedIds } from "@/data/guides/published";
import { useRouterReady } from "@/hooks/useRouterReady";
import { getAllGuides } from "@/lib/markdownTools";

const NoResult: FunctionComponent = () => {
  return <>There&apos;s nothing here :(</>;
};

const RouterReadyContent: FunctionComponent<{ router: NextRouter } & StaticProps> = ({
  router,
  availableGuides,
}) => {
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

  const filteredGuides = availableGuides
    .filter((g) => (guideType !== "all" ? g.meta.type === guideType : true))
    .filter((g) => g.meta.title.toLowerCase().includes(input.toString().toLowerCase()))
    .sort((a, b) => b.meta.publishedAt - a.meta.publishedAt);

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
      <div className="mb-4 flex flex-col gap-2 lg:flex-row">
        <select
          value={guideType}
          onChange={handleOptionChange}
          className="form-select block h-10 w-full appearance-none rounded-lg border border-neutral-200 bg-white text-sm font-semibold uppercase text-[#000] placeholder:text-neutral-400 focus:ring-2 focus:ring-primary-500 dark:border-dark-800 dark:bg-dark-900 dark:text-dark-300 dark:placeholder:text-dark-500 lg:w-44"
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

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredGuides.length <= 0 && <NoResult />}
        {filteredGuides.map((guide) => (
          <GuideCard
            key={guide.character.id}
            id={guide.character.id}
            href={`/guides/${guide.meta.id}`}
            title={guide.meta.title}
            description={guide.character.description}
            publishedAtUnix={guide.meta.publishedAt}
            author={guide.meta.author}
            thumbnail={`/img/characters/${guide.character.id}/avatar_header_1200.webp`}
          />
        ))}
      </div>
    </>
  );
};

const GuidesIndex = ({ availableGuides }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [ready, router] = useRouterReady();
  const { t } = useTranslation();

  return (
    <Layout title={t("common:guides")} description={t("meta:guides.home.description")}>
      <Container>
        {ready && <RouterReadyContent router={router} availableGuides={availableGuides} />}
      </Container>
    </Layout>
  );
};

type StaticProps = {
  availableGuides: Array<{ character: CharacterType; meta: MetaType }>;
};

export const getStaticProps: GetStaticProps<StaticProps> = async ({ locale = "en" }) => {
  const guides = await getAllGuides(locale);
  const metas = guides.map((g) => g.meta);

  const availableGuides = publishedIds.reduce((acc, id) => {
    const character = getCharacterById(id);
    if (typeof character !== "undefined") {
      const meta = metas.find((m) => m.id.toLowerCase() === id.toLowerCase());
      if (typeof meta !== "undefined") {
        acc.push({ character, meta });
      }
    }

    return acc;
  }, new Array<StaticProps["availableGuides"][0]>());

  return {
    props: { availableGuides },
  };
};

export default GuidesIndex;

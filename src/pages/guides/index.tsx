import type { CharacterType } from "@/data/character.schema";
import type { MetaType } from "@/data/guides/meta.schema";
import type { GetStaticProps, InferGetStaticPropsType } from "next";
import type { ChangeEvent, FunctionComponent } from "react";

import { useAtom } from "jotai";
import { useHydrateAtoms } from "jotai/utils";
import { useTranslations } from "next-intl";
import { useDeferredValue, useMemo } from "react";

import { guideSearchQueryAtom, guideSearchTypeAtom } from "@/atoms/guideSearch";
import { GuideCard } from "@/components/cards/GuideCard";
import { Container } from "@/components/Container";
import { Input } from "@/components/Input";
import { Layout } from "@/components/Layout";
import { getCharacterById } from "@/data/characters";
import { getAllGuides } from "@/lib/markdownTools";

const NoResult: FunctionComponent = () => {
  return <>There&apos;s nothing here :(</>;
};

const GuidesIndex = ({ availableGuides }: InferGetStaticPropsType<typeof getStaticProps>) => {
  useHydrateAtoms([
    [guideSearchQueryAtom, ""],
    [guideSearchTypeAtom, "all"],
  ]);

  const t = useTranslations();

  const [input, setInput] = useAtom(guideSearchQueryAtom);
  const deferredInput = useDeferredValue(input);

  const [guideType, setGuideType] = useAtom(guideSearchTypeAtom);

  const filteredGuides = useMemo(
    () =>
      availableGuides
        .filter((g) => (guideType !== "all" ? g.meta.type === guideType : true))
        .filter((g) => g.meta.title.toLowerCase().includes(input.toString().toLowerCase()))
        .sort((a, b) => b.meta.publishedAt - a.meta.publishedAt),
    [deferredInput, guideType],
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleOptionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setGuideType(e.target.value);
  };

  return (
    <Layout
      title={t("common.guides", { count: 0 })}
      description={t("meta.guides.home.description")}
    >
      <Container>
        <div className="mb-4 flex flex-col gap-2 lg:flex-row">
          <select
            value={guideType}
            onChange={handleOptionChange}
            className="form-select block h-10 w-full appearance-none rounded-lg border border-gray-200 bg-white text-sm font-semibold uppercase text-[#000] shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-primary-500 lg:w-44"
          >
            <option value="all">{t(`guides.types-all`)}</option>
            <option value="character">{t(`guides.types-characters`)}</option>
            <option value="general">{t(`guides.types-general`)}</option>
          </select>

          <Input
            value={input}
            onChange={handleInputChange}
            placeholder={t(`common.search-by-title`)}
            fullWidth
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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

  const availableGuides = metas.reduce((acc, meta) => {
    const character = getCharacterById(meta.id);
    if (typeof character !== "undefined") {
      acc.push({ character, meta });
    }

    return acc;
  }, new Array<StaticProps["availableGuides"][0]>());

  const messages = {
    common: (await import(`#/locales/${locale}/common.json`)).default,
    meta: (await import(`#/locales/${locale}/meta.json`)).default,
    footer: (await import(`#/locales/${locale}/footer.json`)).default,
    guides: (await import(`#/locales/${locale}/guides.json`)).default,
  };

  return {
    props: {
      availableGuides,
      messages,
    },
  };
};

export default GuidesIndex;

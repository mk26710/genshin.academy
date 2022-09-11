import type { CharacterType } from "@/data/character.schema";
import type { GetStaticProps, NextPage } from "next";
import type { ChangeEvent, FunctionComponent } from "react";

import { useAtom } from "jotai";
import { useTranslations } from "next-intl";
import { useDeferredValue } from "react";

import {
  characterSearchAtom,
  charactersFilterFivestarsAtom,
  charactersFilterFourstarsAtom,
} from "@/atoms/characterSearch";
import { CharacterCard } from "@/components/cards/CharacterCard";
import { Container } from "@/components/Container";
import { Input } from "@/components/Input";
import { Layout } from "@/components/Layout";
import { charactersArray } from "@/data/characters";

const SearchAndFilter: FunctionComponent = () => {
  const t = useTranslations();

  const [search, setSearch] = useAtom(characterSearchAtom);
  const [fivestars, setFivestars] = useAtom(charactersFilterFivestarsAtom);
  const [fourstars, setFourstars] = useAtom(charactersFilterFourstarsAtom);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleFivestarsCheckboxChange = () => {
    setFivestars(!fivestars);
  };

  const handleFourstarsCheckboxChange = () => {
    setFourstars(!fourstars);
  };

  return (
    <>
      <div className="mb-6 flex flex-row gap-4 lg:flex-row">
        <Input placeholder={t(`common.search-by-name`)} onChange={handleChange} value={search} />

        <div
          role="radiogroup"
          className="inline-flex border-collapse items-center -space-x-px rounded-md text-xs"
        >
          <span>
            <input
              id="fivestar-filter"
              type="checkbox"
              className="peer hidden"
              onChange={handleFivestarsCheckboxChange}
              checked={fivestars}
            />
            <label
              htmlFor="fivestar-filter"
              className="box-border h-10 rounded-l-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-[#000] peer-checked:border-primary-700 peer-checked:bg-primary-100 peer-checked:text-primary-700"
            >
              5*
            </label>
          </span>

          <span>
            <input
              id="fourstar-filter"
              type="checkbox"
              className="peer hidden"
              onChange={handleFourstarsCheckboxChange}
              checked={fourstars}
            />
            <label
              htmlFor="fourstar-filter"
              className="box-border h-10 rounded-r-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-[#000] peer-checked:border-primary-700 peer-checked:bg-primary-100 peer-checked:text-primary-700"
            >
              4*
            </label>
          </span>
        </div>
      </div>
    </>
  );
};

const CharactersIndex: NextPage = () => {
  const t = useTranslations();

  const [search] = useAtom(characterSearchAtom);
  const deferredSearch = useDeferredValue(search);

  const [showFivestars] = useAtom(charactersFilterFivestarsAtom);
  const [showFourstars] = useAtom(charactersFilterFourstarsAtom);

  const filteredCharacters = charactersArray
    .filter((c) =>
      t(`characters/names.${c.id}`).toLowerCase().includes(deferredSearch.toLowerCase()),
    )
    .reduce<CharacterType[]>((acc, current) => {
      if (!showFivestars && current.rarity === 5) {
        return acc;
      }

      if (!showFourstars && current.rarity === 4) {
        return acc;
      }

      return [...acc, current];
    }, []);

  return (
    <Layout title={t("common.characters")} description={t("meta.characters.home.description")}>
      <Container>
        <SearchAndFilter />

        <div className="mt-4 flex flex-row flex-wrap justify-evenly gap-4 md:justify-start">
          {filteredCharacters.map((c) => (
            <CharacterCard key={c.id} character={c} />
          ))}
        </div>
      </Container>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale = "en" }) => {
  const messages = {
    common: (await import(`#/locales/${locale}/common.json`)).default,
    meta: (await import(`#/locales/${locale}/meta.json`)).default,
    footer: (await import(`#/locales/${locale}/footer.json`)).default,
    "characters/names": (await import(`#/locales/${locale}/characters/names.json`)).default,
  };

  return {
    props: {
      messages,
    },
  };
};

export default CharactersIndex;

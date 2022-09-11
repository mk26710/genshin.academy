import type { CharacterType } from "@/data/character.schema";
import type { GetStaticProps, NextPage } from "next";
import type { ChangeEvent, FunctionComponent } from "react";

import { useAtom } from "jotai";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
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
  const { t } = useTranslation();

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
      <div className="sticky top-0 z-10 flex flex-row gap-4 rounded-b-md bg-gray-100 pb-6 pt-4 pl-4 lg:flex-row">
        <Input placeholder={t`common:search-by-name`} onChange={handleChange} value={search} />

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
  const { t } = useTranslation();

  const [search] = useAtom(characterSearchAtom);
  const deferredSearch = useDeferredValue(search);

  const [showFivestars] = useAtom(charactersFilterFivestarsAtom);
  const [showFourstars] = useAtom(charactersFilterFourstarsAtom);

  const filteredCharacters = charactersArray
    .filter((c) =>
      t(`characters/names:${c.id}`).toLowerCase().includes(deferredSearch.toLowerCase()),
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
    <Layout title={t("common:characters")} description={t("meta:characters.home.description")}>
      <Container className="mt-0">
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
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "footer", "meta", "characters/names"])),
    },
  };
};

export default CharactersIndex;

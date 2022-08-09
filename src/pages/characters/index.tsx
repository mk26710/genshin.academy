import type { GetStaticProps, NextPage } from "next";
import type { ChangeEvent } from "react";

import { useAtom } from "jotai";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useDeferredValue } from "react";

import { characterSearchAtom } from "@/atoms/characterSearch";
import { CharacterCard } from "@/components/cards/CharacterCard";
import { Container } from "@/components/Container";
import { Input } from "@/components/Input";
import { Layout } from "@/components/Layout";
import { charactersArray } from "@/data/characters";

const CharactersIndex: NextPage = () => {
  const [search, setSearch] = useAtom(characterSearchAtom);
  const deferredSearch = useDeferredValue(search);

  const { t } = useTranslation();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <Layout title={t("common:characters")} description={t("meta:characters.home.description")}>
      <Container>
        <div className="mb-6 flex flex-col gap-4 lg:flex-row">
          <Input placeholder={t`common:search-by-name`} onChange={handleChange} value={search} />
        </div>

        <div className="flex flex-row flex-wrap justify-evenly gap-4 md:justify-start">
          {charactersArray
            .filter((character) =>
              t(`characters/names:${character.id}`)
                .toLowerCase()
                .includes(deferredSearch.toLowerCase()),
            )
            .map((character) => (
              <CharacterCard key={character.id} character={character} />
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

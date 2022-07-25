import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import type { ChangeEvent } from "react";

import { useAtom } from "jotai";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { characterSearchAtom } from "@/atoms/characterSearch";
import { CharacterCard } from "@/components/cards/CharacterCard";
import { Container } from "@/components/Container";
import { Input } from "@/components/Input";
import { Layout } from "@/components/Layout";
import { charactersArray } from "@/data/characters";
import { getI18nPaths } from "@/lib/i18n";
import nextI18nextConfig from "next-i18next.config";

const CharactersIndex: NextPage = () => {
  const [search, setSearch] = useAtom(characterSearchAtom);

  const { t } = useTranslation();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <Layout title={t("common:characters")} description={t("meta:characters.home.description")}>
      <Container>
        <div className="mb-6 flex flex-col lg:flex-row gap-4">
          <Input placeholder={t`common:search-by-name`} onChange={handleChange} value={search} />
        </div>

        <div className="flex flex-row flex-wrap gap-4 justify-evenly md:justify-start">
          {charactersArray.map((character) => (
            <CharacterCard
              className={
                character.name.toLowerCase().includes(search.toLowerCase()) ? "" : "hidden"
              }
              key={character.id}
              character={character}
            />
          ))}
        </div>
      </Container>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = () => ({
  fallback: false,
  paths: getI18nPaths(),
});

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const locale = params?.locale?.toString() ?? "en";

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "footer", "meta"], nextI18nextConfig)),
    },
  };
};

export default CharactersIndex;

import type { GetStaticProps, NextPage } from "next";
import type { ChangeEvent } from "react";

import { useAtom } from "jotai";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { characterSearchAtom } from "@/atoms/characterSearch";
import { CharacterCard } from "@/components/cards/CharacterCard";
import { Container } from "@/components/Container";
import { Input } from "@/components/Input";
import { Layout } from "@/components/Layout";
import { charactersArray } from "@/data/characters";
import { getI18nPaths } from "@/i18n/getI18nPaths";
import nextI18nextConfig from "next-i18next.config";

export const getStaticPaths = () => ({
  fallback: false,
  paths: getI18nPaths(),
});

export const getStaticProps: GetStaticProps = async (ctx) => ({
  props: {
    ...(await serverSideTranslations(`${ctx?.params?.locale}`, ["common"], nextI18nextConfig)),
  },
});

const CharactersIndex: NextPage = () => {
  const [search, setSearch] = useAtom(characterSearchAtom);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <Layout title="Characters" description="Genshin Impact playable characters.">
      <Container>
        <div className="mb-6 flex flex-col lg:flex-row gap-4">
          <Input placeholder="Search by name" onChange={handleChange} value={search} />
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

export default CharactersIndex;

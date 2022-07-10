import type { NextPage } from "next";
import type { ChangeEvent } from "react";

import { useAtom } from "jotai";

import { characterSearchAtom } from "@/atoms/characterSearch";
import { CharacterCard } from "@/components/cards/CharacterCard";
import { Container } from "@/components/Container";
import { Input } from "@/components/Input";
import { Layout } from "@/components/Layout";
import { charactersArray } from "@/data/characters";

const CharactersIndex: NextPage = () => {
  const [search, setSearch] = useAtom(characterSearchAtom);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <Layout title="Characters" description="Genshin Impact playable characters.">
      <Container>
        <div className="mb-4 mt-6 flex flex-col lg:flex-row gap-4">
          <h1 className="font-semibold text-4xl">Characters</h1>
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

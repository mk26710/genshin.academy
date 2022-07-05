import type { NextPage } from "next";
import type { ChangeEvent } from "react";

import { debounce } from "lodash-es";
import { useState } from "react";

import { CharacterCard } from "@/components/cards/CharacterCard";
import { Container } from "@/components/Container";
import { Input } from "@/components/Input";
import { Layout } from "@/components/Layout";
import { charactersArray } from "@/data/characters";

const CharactersIndex: NextPage = () => {
  const [input, setInput] = useState(``);

  const deboucnedHandleChange = debounce((e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }, 300);

  return (
    <Layout title="Characters" description="Genshin Impact playable characters.">
      <Container>
        <div className="mb-4 mt-6 flex flex-col lg:flex-row gap-4">
          <h1 className="font-semibold text-4xl">Characters</h1>
          <Input
            placeholder="Search by name"
            onChange={deboucnedHandleChange}
            className="translate-y-1"
          />
        </div>

        <div className="flex flex-row flex-wrap gap-4 justify-evenly md:justify-start">
          {charactersArray
            .filter((character) => character.name.toLowerCase().includes(input.toLowerCase()))
            .map((character) => (
              <CharacterCard key={character.id} character={character} />
            ))}
        </div>
      </Container>
    </Layout>
  );
};

export default CharactersIndex;

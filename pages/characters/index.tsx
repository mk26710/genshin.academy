import { CharacterCard } from "@/components/cards/CharacterCard";
import { Container } from "@/components/Container";
import { Layout } from "@/components/Layout";
import { charactersArray } from "@/data/characters";
import { NextPage } from "next";

const CharactersIndex: NextPage = () => {
  return (
    <Layout title="Characters" description="Genshin Impact playable characters.">
      <Container>
        <h1 className="font-semibold text-4xl mb-4 mt-6">Characters</h1>

        <div className="flex flex-row flex-wrap gap-2 justify-evenly md:justify-start">
          {charactersArray.map((character) => (
            <CharacterCard
              key={character.id}
              id={character.id}
              name={character.name}
              rarity={character.rarity}
            />
          ))}
        </div>
      </Container>
    </Layout>
  );
};

export default CharactersIndex;

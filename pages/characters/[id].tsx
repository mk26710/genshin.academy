import type { GetStaticProps } from "next";

import { Layout } from "@/components/Layout";
import { Container } from "@/components/Container";

import { charactersArray, getCharacterById } from "@/data/characters";
import type { Character } from "@/data/character";
import { avatarPath, characterIcon } from "@/lib/helpers";

interface StaticProps {
  character: Character;
}

export const getStaticPaths = async () => {
  const paths = charactersArray.map(({ id }) => ({ params: { id } }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<StaticProps> = async (context) => {
  const paramsId = context.params?.id;
  const character = getCharacterById(`${paramsId}`);

  if (character == null) {
    return { notFound: true };
  }

  return {
    props: { character },
  };
};

const CharactersId = ({ character }: StaticProps) => {
  return (
    <Layout
      title={`${character.name}`}
      color={`${character.accentColor}`}
      description={`${character.description}`}
      iconURL={characterIcon(character.id)}
    >
      <Container>
        <h1 className="font-semibold text-4xl mb-4 mt-6">{character.name}</h1>
        <p>{character.description}</p>
        <img src={avatarPath(character.id, "webp")} alt={`${character.name} gacha image`} />
      </Container>
    </Layout>
  );
};

export default CharactersId;

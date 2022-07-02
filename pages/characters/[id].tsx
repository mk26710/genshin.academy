import type { CharacterType } from "@/data/character";
import type { GetStaticProps } from "next";

import { Container } from "@/components/Container";
import { Layout } from "@/components/Layout";
import { charactersArray, getCharacterById } from "@/data/characters";
import { avatarPath, characterIcon } from "@/lib/helpers";

interface StaticProps {
  character: CharacterType;
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
        <div className="flex flex-col-reverse lg:flex-row">
          <div className="flex-1 grow">
            <h1 id="name" className="font-semibold text-4xl mb-4 mt-6">
              {character.name}
            </h1>

            <p id="description">{character.description}</p>

            <h2 id="consteallations" className="font-semibold text-2xl mt-6 mb-4">
              Consteallations
            </h2>

            <ol className="marker:text-sky-500 list-decimal pl-4">
              {character.constellations.map(({ level, title, description }) => (
                <li key={`const-${level}`} id={`constellation-${level}`} className="[&+li]:mt-2">
                  <h3 className="font-semibold text-lg">{title}</h3>
                  <p className="whitespace-pre-line">{description}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="lg:max-w-xs xl:max-w-xl">
            <img src={avatarPath(character.id, `webp`)} alt={`${character.name} gacha image`} />
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default CharactersId;

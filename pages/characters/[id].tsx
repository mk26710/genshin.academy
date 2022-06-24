import type { GetStaticProps } from "next";
import Head from "next/head";

import { MainLayout } from "@/components/MainLayout";

import { charactersArray, getCharacterById } from "@/data/characters";
import type { Character } from "@/data/character";
import { avatarPath } from "@/lib/helpers";

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
    <>
      <Head>
        <title>{`${character.name}`}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainLayout>
        <h1 className="font-semibold text-4xl mb-4 mt-6">{character.name}</h1>
        <p>{character.description}</p>
        <img src={avatarPath(character.id, "webp")} />
      </MainLayout>
    </>
  );
};

export default CharactersId;

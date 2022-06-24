import type { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";

import { Container } from "@/components/Container";

import type { Character } from "@/data/character";
import { getCharacterById } from "@/data/characters";
import published from "@/data/guides/compiled/characters/published.json";

interface StaticProps {
  id: string;
  html: string;
  character: Character;
}

export const getStaticPaths = async () => {
  const paths = published.map((id) => ({ params: { id } }));

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

  const data = await import(`@/data/guides/compiled/characters/${character.id}.json`);

  const id: string = data.id;
  const html: string = data.html;

  return {
    props: { id, html, character },
  };
};

const GuidesId = ({ html, character }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head>
        <title>{`${character.name} Guide`}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <section className="md-body" dangerouslySetInnerHTML={{ __html: html }} />
      </Container>
    </>
  );
};

export default GuidesId;

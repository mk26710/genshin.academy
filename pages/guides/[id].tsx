import type { GetStaticProps, InferGetStaticPropsType } from "next";

import { Layout } from "@/components/Layout";
import { Container } from "@/components/Container";

import type { Character } from "@/data/character";
import { characterIcon } from "@/lib/helpers";
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
    <Layout
      title={`${character.name} Guide`}
      description={`Builds and playstyle for ${character.name}`}
      iconURL={characterIcon(character.id)}
    >
      <Container>
        <section className="md-body" dangerouslySetInnerHTML={{ __html: html }} />
      </Container>
    </Layout>
  );
};

export default GuidesId;

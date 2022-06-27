import type { Character } from "@/data/character";
import type { GetStaticProps, InferGetStaticPropsType } from "next";

import { Container } from "@/components/Container";
import { Layout } from "@/components/Layout";
import { getCharacterById } from "@/data/characters";
import { Guide } from "@/data/guide";
import published from "@/data/guides/compiled/characters/published.json";
import { characterIcon } from "@/lib/helpers";

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

  const { default: data } = await import(`@/data/guides/compiled/characters/${character.id}.json`);
  const { id, html } = await Guide.parseAsync(data);

  return {
    props: { id, html, character },
  };
};

const GuidesId = ({ html, character }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Layout
      title={`${character.name} Guide`}
      color={`${character.accentColor}`}
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

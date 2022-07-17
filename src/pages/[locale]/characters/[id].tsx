import type { CharacterType } from "@/data/character";
import type { GetStaticProps } from "next";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { Container } from "@/components/Container";
import { Layout } from "@/components/Layout";
import { charactersArray, getCharacterById } from "@/data/characters";
import { getI18nPaths } from "@/i18n/getI18nPaths";
import { avatarPath, characterIcon } from "@/lib/helpers";
import nextI18nextConfig from "next-i18next.config";

interface StaticProps {
  character: CharacterType;
}

export const getStaticPaths = async () => {
  const i18nPaths = getI18nPaths();
  const paths = charactersArray
    .map(({ id }) => i18nPaths.map(({ params }) => ({ params: { id, ...params } })))
    .flat();

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
    props: {
      character,
      ...(await serverSideTranslations(
        `${context?.params?.locale}`,
        ["common"],
        nextI18nextConfig,
      )),
    },
  };
};

const CharactersId = ({ character }: StaticProps) => {
  const elementSrc = `/img/elements/${character.vision.toLowerCase()}/icon.webp`;

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
            <h1 id="name" className="font-semibold text-4xl mb-4 mt-6 dark:text-dark-300">
              {character.name}{" "}
              <img className="inline-block align-middle h-6 " src={elementSrc} alt="Element" />
            </h1>

            <p id="description">{character.description}</p>

            <h2
              id="consteallations"
              className="font-semibold text-2xl mt-6 mb-4 dark:text-dark-300"
            >
              Consteallations
            </h2>

            <ol className="marker:text-primary-500 list-decimal pl-4">
              {character.constellations.map(({ level, title, description }) => (
                <li key={`const-${level}`} id={`constellation-${level}`} className="[&+li]:mt-2">
                  <h3 className="font-semibold text-lg dark:text-dark-300">{title}</h3>
                  <p className="whitespace-pre-line">{description}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="lg:max-w-xs xl:max-w-xl">
            <img src={avatarPath(character.id, "webp")} alt={`${character.name} gacha image`} />
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default CharactersId;

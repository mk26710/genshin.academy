import type { CharacterType } from "@/data/character.schema";
import type { GetStaticPaths, GetStaticProps } from "next";

import { useTranslations } from "next-intl";

import { Container } from "@/components/Container";
import { Layout } from "@/components/Layout";
import { charactersArray, getCharacterById } from "@/data/characters";
import { avatarPath, characterIcon } from "@/lib/helpers";

interface StaticProps {
  character: CharacterType;
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  let paths = charactersArray.map(({ id }) => ({ params: { id } }));

  if (typeof locales !== "undefined") {
    paths = locales.flatMap((locale) => {
      return paths.map((path) => {
        return {
          ...path,
          locale,
        };
      });
    });
  }

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<StaticProps> = async ({ locale = "en", params }) => {
  const paramsId = params?.id;
  const character = getCharacterById(`${paramsId}`);

  if (character == null) {
    return { notFound: true };
  }

  const messages = {
    common: (await import(`#/locales/${locale}/common.json`)).default,
    meta: (await import(`#/locales/${locale}/meta.json`)).default,
    footer: (await import(`#/locales/${locale}/footer.json`)).default,
    "characters/names": (await import(`#/locales/${locale}/characters/names.json`)).default,
  };

  return {
    props: {
      character,
      messages,
    },
  };
};

const CharactersId = ({ character }: StaticProps) => {
  const t = useTranslations();

  const elementSrc = `/img/elements/${character.vision.toLowerCase()}/icon.webp`;

  return (
    <Layout
      title={t(`characters/names.${character.id}`)}
      color={`${character.accentColor}`}
      description={`${character.description}`}
      iconURL={characterIcon(character.id)}
    >
      <Container>
        <div className="card flex flex-col-reverse px-6 pt-6 pb-8 lg:flex-row">
          <div className="flex-1 grow">
            <h1 id="name" className="mb-4 text-4xl font-semibold">
              {t(`characters/names.${character.id}`)}{" "}
              <img className="inline-block h-6 align-middle " src={elementSrc} alt="Element" />
            </h1>

            <p id="description" className="whitespace-pre-line">
              {character.description}
            </p>

            <h2 id="consteallations" className="mt-6 mb-4 text-2xl font-semibold">
              Consteallations
            </h2>

            <ol className="list-decimal pl-4 marker:text-primary-500">
              {character.constellations.map(({ level, title, description }) => (
                <li key={`const-${level}`} id={`constellation-${level}`} className="[&+li]:mt-2">
                  <h3 className="font-semibold00 text-lg">{title}</h3>
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

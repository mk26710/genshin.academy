import type { CharacterType } from "@/data/character";
import type { MetaType } from "@/data/guides/compiled/meta";
import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";

import useTranslation from "next-translate/useTranslation";
import { useEffect, useRef, useState } from "react";

import { Container } from "@/components/Container";
import { ContentsTable } from "@/components/ContentsTable";
import { Layout } from "@/components/Layout";
import { getCharacterById } from "@/data/characters";
import { Guide } from "@/data/guides/compiled/guide";
import published from "@/data/guides/compiled/published.json";
import { characterIcon } from "@/lib/helpers";

interface StaticProps {
  meta: MetaType;
  html: string;
  character: CharacterType;
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  let paths = published.map(({ id }) => ({ params: { id } }));

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

export const getStaticProps: GetStaticProps<StaticProps> = async ({ params }) => {
  const paramsId = params?.id;
  const character = getCharacterById(`${paramsId}`);

  if (character == null) {
    return { notFound: true };
  }

  const { default: data } = await import(`@/data/guides/compiled/${character.id}.json`);
  const { meta, html } = await Guide.parseAsync(data);

  return {
    props: { meta, html, character },
  };
};

const GuidesId = ({ html, character }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { t } = useTranslation();

  const [headings, setHeadings] = useState<string[]>([]);
  const contentRoot = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = contentRoot.current;

    if (el != null && headings.length <= 0) {
      const headings = Array.from(el.children)
        .filter((el) => el instanceof HTMLHeadingElement && el.getAttribute("id") != null)
        .reduce((acc, el) => {
          const id = el.getAttribute("id");

          const validArr = [...acc];
          if (id != null) {
            validArr.push(id);
          }

          return validArr;
        }, new Array<string>());

      setHeadings(headings);
    }
  }, [contentRoot]);

  return (
    <Layout
      title={t("meta:guides.id.title", { name: character.name })}
      description={t("meta:guides.id.description", { name: character.name })}
      iconURL={characterIcon(character.id)}
      color={`${character.accentColor}`}
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto]">
          <section
            ref={contentRoot}
            className="md-body"
            dangerouslySetInnerHTML={{ __html: html }}
          />

          <ContentsTable title="Guide Contents" headings={headings} />
        </div>
      </Container>
    </Layout>
  );
};

export default GuidesId;

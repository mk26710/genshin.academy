import type { CharacterType } from "@/data/character.schema";
import type { MetaType } from "@/data/guides/meta.schema";
import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useEffect, useRef, useState } from "react";

import { Container } from "@/components/Container";
import { ContentsTable } from "@/components/ContentsTable";
import { Layout } from "@/components/Layout";
import { getCharacterById } from "@/data/characters";
import { PUBLISHED_GUIDES } from "@/data/guides/published";
import { characterIcon } from "@/lib/helpers";
import { getGuide } from "@/lib/markdownTools";

interface StaticProps {
  meta: MetaType;
  html: string;
  character: CharacterType;
}

const GuidesId = ({ meta, html, character }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { t } = useTranslation();

  const [headings, setHeadings] = useState<string[]>([]);
  const contentRoot = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = contentRoot.current;

    if (el != null && headings.length <= 0) {
      const headings = Array.from(el.querySelectorAll("h1, h2"))
        .filter((el) => el.getAttribute("id") != null)
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
      title={meta.title}
      description={t("meta:guides.id.description", { name: character.name })}
      iconURL={characterIcon(character.id)}
      color={`${character.accentColor}`}
    >
      <Container>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[auto_1fr]">
          <article
            ref={contentRoot}
            className="markdown-content card prose prose-blue max-w-none bg-white px-4 py-6 text-justify text-base prose-thead:border-none prose-thead:border-gray-200 lg:px-8 lg:py-8"
            dangerouslySetInnerHTML={{ __html: html }}
          />

          <ContentsTable title={t`common:contents`} headings={headings} />
        </div>
      </Container>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async ({ locales = ["en"] }) => {
  const paths = locales.flatMap((locale) => {
    const availableGuides = PUBLISHED_GUIDES[locale];

    return availableGuides.map((id) => {
      return {
        locale,
        params: {
          id,
        },
      };
    });
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<StaticProps> = async ({ params, locale = "en" }) => {
  const paramsId = params?.id?.toString().toLowerCase();
  if (typeof paramsId === "undefined") {
    return { notFound: true };
  }

  if (!PUBLISHED_GUIDES[locale].includes(paramsId)) {
    return { notFound: true };
  }

  const character = getCharacterById(paramsId);
  if (character == null) {
    return { notFound: true };
  }

  const guide = await getGuide(paramsId, locale);

  return {
    props: {
      ...guide,
      character,
      ...(await serverSideTranslations(locale, ["common", "footer", "meta"])),
    },
  };
};

export default GuidesId;

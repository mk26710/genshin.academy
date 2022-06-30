import type { CharacterType } from "@/data/character";
import type { GetStaticProps, InferGetStaticPropsType } from "next";

import { useEffect, useRef, useState } from "react";

import { Container } from "@/components/Container";
import { Layout } from "@/components/Layout";
import { getCharacterById } from "@/data/characters";
import { Guide } from "@/data/guide";
import published from "@/data/guides/compiled/characters/published.json";
import { characterIcon } from "@/lib/helpers";

interface StaticProps {
  id: string;
  html: string;
  character: CharacterType;
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
  const [headings, setHeadings] = useState<string[]>([]);
  const contentRoot = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = contentRoot.current;

    if (el != null && headings.length <= 0) {
      const headings = Array.from(el.children)
        .filter((el) => el instanceof HTMLHeadingElement && el.getAttribute(`id`) != null)
        .reduce((acc, el) => {
          const id = el.getAttribute(`id`);

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
      title={`${character.name} Guide`}
      color={`${character.accentColor}`}
      description={`Builds and playstyle for ${character.name}`}
      iconURL={characterIcon(character.id)}
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto]">
          <section
            ref={contentRoot}
            className="md-body"
            dangerouslySetInnerHTML={{ __html: html }}
          />

          <div className="hidden lg:flex flex-col min-h-screen max-h-screen">
            <div className="sticky top-4 overflow-y-auto ml-4 w-64 rounded-lg border border-neutral-200 dark:border-neutral-200/10 dark:bg-neutral-800 bg-white">
              <div className="flex flex-col gap-y-2 p-4 w-full">
                <h1 className="pb-2 font-semibold border-b border-neutral-200 dark:border-dark-200/10">
                  Guide Contents
                </h1>

                {headings.map((heading) => (
                  <a key={`guide-nav-${heading}`} href={`#${heading}`} className="capitalize">
                    {heading}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default GuidesId;

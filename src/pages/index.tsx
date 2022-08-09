import type { CharacterType } from "@/data/character.schema";
import type { MetaType } from "@/data/guides/meta.schema";
import type { GetStaticProps, InferGetStaticPropsType } from "next";
import type { FunctionComponent } from "react";

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";
import Link from "next/link";

import { Container } from "@/components/Container";
import { Layout } from "@/components/Layout";
import { getCharacterById } from "@/data/characters";
import { getAllGuides } from "@/lib/markdownTools";

const BirthdayToday = dynamic(() => import("@/components/BirthdaysToday"), { ssr: false });

interface LatestGuideProps {
  meta: MetaType;
  character: CharacterType;
}

const LatestGuide: FunctionComponent<LatestGuideProps> = ({ meta, character }) => {
  const { t } = useTranslation();

  return (
    <Link href={`/guides/${meta.id}`}>
      <a className="box-border flex flex-col rounded-lg border border-neutral-200 bg-white p-4 text-sm text-neutral-700 dark:border-dark-800 dark:bg-dark-900 dark:text-dark-400">
        <h1 className="mb-4 text-xl font-semibold text-[#000] dark:text-dark-300">
          {t`home:latest-guide`}
        </h1>

        {/* TODO: handle non-character guides */}
        {meta.type === "character" && (
          <div className="flex flex-col gap-2 sm:flex-row">
            <img
              src={`/img/characters/${character.id}/icon.webp`}
              alt={character.name + " icon"}
              width="256px"
              height="256px"
              className="border-box h-28 w-28 rounded-lg border border-neutral-200 bg-neutral-100 text-transparent dark:border-dark-800 dark:bg-dark-950"
            />

            <p>
              {t("home:latest-guide-character-legend", {
                author: meta.author,
                name: meta.title,
              })}
            </p>
          </div>
        )}
      </a>
    </Link>
  );
};

const Home = ({ latestGuideMeta, character }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { t } = useTranslation();

  return (
    <Layout title={t("common:home")} description={t("meta:home.description")}>
      <Container>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3">
          <div>
            <LatestGuide meta={latestGuideMeta} character={character} />
          </div>
          <div>
            <BirthdayToday />
          </div>
        </div>
      </Container>
    </Layout>
  );
};

type StaticProps = {
  character: CharacterType;
  latestGuideMeta: MetaType;
};

export const getStaticProps: GetStaticProps<StaticProps> = async ({ locale = "en" }) => {
  const guides = await getAllGuides(locale);

  const latestGuideMeta = guides.sort((a, b) => b.meta.publishedAt - a.meta.publishedAt)[0].meta;
  const character = getCharacterById(latestGuideMeta.id);
  if (!character) {
    throw new Error("character for the guide " + latestGuideMeta.id + " was not found");
  }

  return {
    props: {
      character,
      latestGuideMeta,
      ...(await serverSideTranslations(locale, ["common", "footer", "home", "meta"])),
    },
  };
};

export default Home;

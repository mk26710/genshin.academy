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
      <a className="card flex flex-col transition-all duration-200 ease-in-out hover:-translate-y-1 hover:shadow-lg">
        <h1 className="mb-4 text-xl font-semibold text-[#000]">{t`home:latest-guide`}</h1>

        {/* TODO: handle non-character guides */}
        {meta.type === "character" && (
          <div className="flex flex-col gap-2 sm:flex-row">
            <img
              src={`/img/characters/${character.id}/icon.webp`}
              alt={character.name + " icon"}
              width="256px"
              height="256px"
              className="border-box h-28 w-28 rounded-lg border border-gray-200 bg-gray-100 text-transparent"
            />

            <p className="text-sm">
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
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3">
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

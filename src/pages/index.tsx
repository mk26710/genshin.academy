import type { CharacterType } from "@/data/character.schema";
import type { MetaType } from "@/data/guides/meta.schema";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import type { FunctionComponent } from "react";

import { useTranslations } from "next-intl";
import Link from "next/link";

import BirthdaysToday from "@/components/BirthdaysToday";
import { Container } from "@/components/Container";
import { Layout } from "@/components/Layout";
import { getCharacterById } from "@/data/characters";
import { getAllGuides } from "@/lib/markdownTools";
import { getServerAuthSession } from "@/server/common/get-server-auth-session";

interface LatestGuideProps {
  meta: MetaType;
  character: CharacterType;
}

const LatestGuide: FunctionComponent<LatestGuideProps> = ({ meta, character }) => {
  const t = useTranslations();

  return (
    <Link href={`/guides/${meta.id}`}>
      <a className="card flex flex-col transition-all duration-200 ease-in-out hover:-translate-y-1 hover:shadow-lg">
        <h1 className="mb-4 text-xl font-semibold text-[#000] dark:text-neutral-100">
          {t("home.latest-guide")}
        </h1>

        {/* TODO: handle non-character guides */}
        {meta.type === "character" && (
          <div className="flex flex-col gap-2 sm:flex-row">
            <img
              src={`/img/characters/${character.id}/icon.webp`}
              alt={character.name + " icon"}
              width="256px"
              height="256px"
              className="border-box h-28 w-28 rounded-lg border border-gray-200 bg-gray-100 text-transparent dark:border-neutral-700 dark:bg-neutral-900"
            />

            <p className="text-sm">
              {t("home.latest-guide-character-legend", {
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

const Home = ({
  latestGuideMeta,
  character,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const t = useTranslations();

  return (
    <Layout title={t("common.home")} description={t("meta.home.description")}>
      <Container>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3">
          <div>
            <LatestGuide meta={latestGuideMeta} character={character} />
          </div>
          <div>
            <BirthdaysToday />
          </div>
        </div>
      </Container>
    </Layout>
  );
};

type ServerSideProps = {
  character: CharacterType;
  latestGuideMeta: MetaType;
};

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async ({
  req,
  res,
  locale = "en",
}) => {
  const guides = await getAllGuides(locale);

  const latestGuideMeta = guides.sort((a, b) => b.meta.publishedAt - a.meta.publishedAt)[0].meta;
  const character = getCharacterById(latestGuideMeta.id);
  if (!character) {
    throw new Error("character for the guide " + latestGuideMeta.id + " was not found");
  }

  const messages = {
    common: (await import(`#/locales/${locale}/common.json`)).default,
    meta: (await import(`#/locales/${locale}/meta.json`)).default,
    footer: (await import(`#/locales/${locale}/footer.json`)).default,
    home: (await import(`#/locales/${locale}/home.json`)).default,
  };

  return {
    props: {
      session: await getServerAuthSession({ req, res }),
      character,
      latestGuideMeta,
      messages,
    },
  };
};

export default Home;

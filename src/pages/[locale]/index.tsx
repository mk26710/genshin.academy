import type { GetStaticProps, NextPage } from "next";

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";

import { Container } from "@/components/Container";
import { Layout } from "@/components/Layout";
import { getI18nPaths } from "@/i18n/getI18nPaths";
import nextI18nextConfig from "next-i18next.config";

const BirthdayToday = dynamic(() => import("@/components/BirthdaysToday"), { ssr: false });

export const getStaticPaths = () => ({
  fallback: false,
  paths: getI18nPaths(),
});

export const getStaticProps: GetStaticProps = async (ctx) => ({
  props: {
    ...(await serverSideTranslations(`${ctx?.params?.locale}`, ["common"], nextI18nextConfig)),
  },
});

const Home: NextPage = () => {
  const { t } = useTranslation("common");

  return (
    <Layout
      title="Home"
      description="Genshin Impact characters data, calculators, playstyle guides and more!"
    >
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          <BirthdayToday />
        </div>
      </Container>
    </Layout>
  );
};

export default Home;

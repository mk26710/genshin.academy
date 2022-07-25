import type { GetStaticPaths, GetStaticProps, NextPage } from "next";

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";

import { Container } from "@/components/Container";
import { Layout } from "@/components/Layout";
import { getI18nPaths } from "@/lib/i18n";
import nextI18nextConfig from "next-i18next.config";

const BirthdayToday = dynamic(() => import("@/components/BirthdaysToday"), { ssr: false });

const Home: NextPage = () => {
  const { t } = useTranslation();

  return (
    <Layout title={t("common:home")} description={t("meta:home.description")}>
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          <BirthdayToday />
        </div>
      </Container>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = () => ({
  fallback: false,
  paths: getI18nPaths(),
});

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const locale = params?.locale?.toString() ?? "en";

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "footer", "meta"], nextI18nextConfig)),
    },
  };
};

export default Home;

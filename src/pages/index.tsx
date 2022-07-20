import type { NextPage } from "next";

import useTranslation from "next-translate/useTranslation";
import dynamic from "next/dynamic";

import { Container } from "@/components/Container";
import { Layout } from "@/components/Layout";

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

export default Home;

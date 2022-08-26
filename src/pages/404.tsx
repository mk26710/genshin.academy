import type { GetStaticProps, NextPage } from "next";

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";

import { Container } from "@/components/Container";
import { Layout } from "@/components/Layout";

const NotFound: NextPage = () => {
  const { t } = useTranslation();

  return (
    <Layout title="404" description={t`meta:404.description`}>
      <Container verticalCenter>
        <div className="flex flex-row gap-6">
          <div className="border-r border-gray-200 pr-6">
            <h1 className="text-5xl font-bold text-primary-500">404</h1>
          </div>

          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <h1 className="-ml-1 text-5xl font-bold">{t`404:page-not-found`}</h1>
              <h3 className="opacity-60">{t`404:details`}</h3>
            </div>

            <div className="flex flex-row gap-4">
              <Link href="/">
                <a
                  role="button"
                  className="rounded-lg bg-primary-500 px-4 py-2 font-medium text-white"
                >
                  {t`404:go-back-home`}
                </a>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale = "en" }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "footer", "404", "meta"])),
    },
  };
};

export default NotFound;

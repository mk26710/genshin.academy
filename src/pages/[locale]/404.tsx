import type { GetStaticPaths, GetStaticProps, NextPage } from "next";

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { Container } from "@/components/Container";
import { Layout } from "@/components/Layout";
import LocaleLink from "@/components/LocaleLink";
import { getI18nPaths } from "@/lib/i18n";
import nextI18nextConfig from "next-i18next.config";

const NotFound: NextPage = () => {
  const { t } = useTranslation();

  return (
    <Layout title="404" description={t`meta:404.description`}>
      <Container verticalCenter>
        <div className="flex flex-row gap-6">
          <div className="pr-6 border-r border-neutral-200 dark:border-neutral-200/10">
            <h1 className="font-bold text-5xl text-primary-500">404</h1>
          </div>

          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <h1 className="font-bold text-5xl -ml-1">{t`404:page-not-found`}</h1>
              <h3 className="opacity-60">{t`404:details`}</h3>
            </div>

            <div className="flex flex-row gap-4">
              <LocaleLink href="/">
                <a
                  role="button"
                  className="px-4 py-2 rounded-lg bg-primary-500 font-medium text-white"
                >
                  {t`404:go-back-home`}
                </a>
              </LocaleLink>
            </div>
          </div>
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
      ...(await serverSideTranslations(
        locale,
        ["common", "footer", "404", "meta"],
        nextI18nextConfig,
      )),
    },
  };
};

export default NotFound;

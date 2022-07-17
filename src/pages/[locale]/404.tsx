import type { GetStaticProps, NextPage } from "next";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { Container } from "@/components/Container";
import { Layout } from "@/components/Layout";
import { getI18nPaths } from "@/i18n/getI18nPaths";
import Link from "@/i18n/Link";
import nextI18nextConfig from "next-i18next.config";

export const getStaticPaths = () => ({
  fallback: false,
  paths: getI18nPaths(),
});

export const getStaticProps: GetStaticProps = async (ctx) => ({
  props: {
    ...(await serverSideTranslations(`${ctx?.params?.locale}`, ["common"], nextI18nextConfig)),
  },
});

const NotFound: NextPage = () => {
  return (
    <Layout title="404" description="Not found!">
      <Container verticalCenter>
        <div className="flex flex-row gap-6">
          <div className="pr-6 border-r border-neutral-200 dark:border-neutral-200/10">
            <h1 className="font-bold text-5xl text-primary-500">404</h1>
          </div>

          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <h1 className="font-bold text-5xl -ml-1">Page not found</h1>
              <h3 className="opacity-60">Please check the URL in the address bar and try again.</h3>
            </div>

            <div className="flex flex-row gap-4">
              <Link href="/">
                <a
                  role="button"
                  className="px-4 py-2 rounded-lg bg-primary-500 font-medium text-white"
                >
                  Go back home
                </a>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default NotFound;

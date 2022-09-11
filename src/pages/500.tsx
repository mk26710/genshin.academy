import type { GetStaticProps } from "next";

import { useTranslations } from "next-intl";
import Link from "next/link";

import { Container } from "@/components/Container";
import { Layout } from "@/components/Layout";

const InternalServerError = () => {
  const t = useTranslations();

  return (
    <Layout title="500" description="Internal Server Error">
      <Container verticalCenter>
        <div className="flex flex-row gap-6">
          <div className="border-r border-gray-200 pr-6">
            <h1 className="text-5xl font-bold text-primary-500">500</h1>
          </div>

          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <h1 className="-ml-1 text-5xl font-bold">{t(`common.error-500`)}</h1>
            </div>

            <div className="flex flex-row gap-4">
              <Link href="/">
                <a
                  role="button"
                  className="rounded-lg bg-primary-500 px-4 py-2 font-medium text-white"
                >
                  {t(`404.go-back-home`)}
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
  const messages = {
    common: (await import(`#/locales/${locale}/common.json`)).default,
    meta: (await import(`#/locales/${locale}/meta.json`)).default,
    footer: (await import(`#/locales/${locale}/footer.json`)).default,
    "404": (await import(`#/locales/${locale}/404.json`)).default,
  };

  return {
    props: {
      messages,
    },
  };
};

export default InternalServerError;

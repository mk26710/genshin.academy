import type { GetStaticPaths, InferGetStaticPropsType } from "next";

import { useRouter } from "next/router";
import { useEffect } from "react";

import { publishedIds } from "@/data/guides/published";
import { getI18nLocales } from "@/lib/i18n";
import i18nextConfig from "next-i18next.config";

export const getStaticPaths: GetStaticPaths = async () => {
  const locales = getI18nLocales();

  const paths = publishedIds.flatMap((id) =>
    locales.flatMap((locale) => ({ params: { id, locale } })),
  );

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = () => {
  const { locales } = i18nextConfig.i18n;
  return {
    props: {
      locales,
    },
  };
};

const GuidesId = ({ locales }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();

  // language detection
  // not recommended for production, use server redirection instead of this
  useEffect(() => {
    for (const locale of locales) {
      // eslint-disable-next-line no-undef
      for (const lang of navigator.languages) {
        if (lang.startsWith(locale)) {
          router.replace("/" + locale + router.asPath);
          return;
        }
      }
    }
  }, []);

  return null;
};

export default GuidesId;

import type { GetStaticProps, InferGetStaticPropsType } from "next";

import { useRouter } from "next/router";
import { useEffect } from "react";

import published from "@/data/guides/compiled/published.json";
import i18nextConfig from "next-i18next.config";

export const getStaticPaths = async () => {
  const paths = published.map(({ id }) => ({ params: { id } }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { locales } = i18nextConfig.i18n;
  return {
    props: {
      locales,
      id: ctx.params?.id,
    },
  };
};

const Index = ({ locales, id }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();

  // language detection
  // not recommended for production, use server redirection instead of this
  useEffect(() => {
    for (const locale of locales) {
      // eslint-disable-next-line no-undef
      for (const lang of navigator.languages) {
        if (lang.startsWith(locale)) {
          router.replace("/" + locale + "/guides/" + id);
          return;
        }
      }
    }
  }, []);

  return <></>;
};

export default Index;

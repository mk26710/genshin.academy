import type { V2_MetaDescriptor } from "@remix-run/node";

const SITE_NAME = "GENSHIN.ACADEMY";

const withWebsiteName = (s?: string | null) => {
  if (!s) {
    return SITE_NAME;
  }

  return `${s.trim()} - ${SITE_NAME}`;
};

export const title = (s: string): V2_MetaDescriptor[] => {
  return [
    { title: withWebsiteName(s) },
    { property: "og:title", content: s },
    { property: "og:site_name", content: SITE_NAME },
  ];
};

export const description = (s?: string | null): V2_MetaDescriptor[] => {
  return [
    { name: "description", content: s },
    { property: "og:description", content: s },
  ];
};

import type { HtmlMetaDescriptor } from "@remix-run/node";

const TITLE_TEMPLATE = "GENSHIN.ACADEMY";

export const generateTitle = (s: string) => {
  return TITLE_TEMPLATE != null ? `${s} - ${TITLE_TEMPLATE}` : s;
};

type GenerateMetaOpts = {
  noIndex?: boolean;
  title?: string;
  description?: string;
  imageUrl?: string;
  themeColor?: string;
  keywords?: string;
};

export const generateMeta = (opts: GenerateMetaOpts): HtmlMetaDescriptor => {
  const realTitle = TITLE_TEMPLATE != null ? `${opts.title} - ${TITLE_TEMPLATE}` : opts.title;

  let metaTags: HtmlMetaDescriptor = { title: realTitle, "og:title": realTitle };

  if (typeof opts.description === "string") {
    metaTags = {
      ...metaTags,
      description: opts.description,
      "og:description": opts.description,
    };
  }

  if (typeof opts.imageUrl === "string") {
    metaTags = { ...metaTags, "og:image": opts.imageUrl };
  }

  if (typeof opts.keywords === "string") {
    metaTags = { ...metaTags, keywords: opts.keywords };
  }

  if (typeof opts.themeColor === "string") {
    metaTags = { ...metaTags, "theme-color": opts.themeColor };
  }

  if (typeof opts.noIndex === "boolean" && opts.noIndex === true) {
    metaTags = { ...metaTags, robots: "noindex" };
  }

  return metaTags;
};

import { isFunction } from "lodash-es";

interface Options {
  title?: string;
  titleTemplate?: string;
  description?: string;
  iconURL?: string;
  color?: string;
}

type ZenlessMetaArgument = Options | (() => Options);

export const useZenlessMeta = (arg: ZenlessMetaArgument) => {
  const {
    title = `Paimon is the best!`,
    titleTemplate = `GENSHIN.ZENLESS`,
    description,
    iconURL,
    color = `#2563eb`,
  } = isFunction(arg) ? { ...arg() } : { ...arg };

  const realTitle = titleTemplate != null ? `${title} - ${titleTemplate}` : title;

  const metaArray = [
    { property: `og:type`, content: `website` },
    { name: `theme-color`, content: color },
    { name: `title`, content: realTitle },
    { property: `og:title`, content: realTitle },
  ];

  if (description != null) {
    metaArray.push({ name: `description`, content: description });
    metaArray.push({ property: `og:description`, content: description });
  }

  if (iconURL != null) {
    metaArray.push({ property: `og:image`, content: iconURL });
  }

  metaArray.push({
    name: `keywords`,
    content: `zenless.club,GENSHIN.ZENLESS.CLUB,Genshin Impact Utilities,Genshin Impact Characters,Genshin Impact Guides`,
  });

  useHead({
    title: realTitle,
    meta: metaArray,
  });
};

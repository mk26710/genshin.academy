import type { Root } from "hast";

import rehypeRaw from "rehype-raw";
// import rehypeSanitize, { defaultSchema as sanitizeDefault } from "rehype-sanitize";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remark2Rehype from "remark-rehype";
import { unified } from "unified";
import { visit } from "unist-util-visit";

const headingRegex = new RegExp(
  /\<h(?<level>[1-6])(.+?)id=\"(?<id>[^"]*)\"(.*?)\>(?<value>.*?)<\/h[1-6]>/gm,
);

export const markdownParser = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remark2Rehype, { allowDangerousHtml: true })
  .use(rehypeRaw, { passThrough: ["details", "summary"] })
  .use(rehypeSlug)
  // Adds lazy loading and async decoding to img elements
  .use(() => (root: Root) => {
    visit(root, "element", (node) => {
      if (node.type === "element" && node.tagName === "img") {
        node.properties = {
          ...node.properties,
          decoding: "async",
          loading: "lazy",
          "data-viewable-image": "true",
        };
      }
    });
  })
  // .use(rehypeSanitize, {
  //   tagNames: [...(sanitizeDefault.tagNames ?? []), "details", "iframe", "summary"],
  // })
  .use(rehypeStringify);

export const extractHeadings = (content: string) =>
  Array.from(content.matchAll(headingRegex)).map((match) => ({
    level: parseInt(match.groups?.level ?? "-1"),
    id: match.groups?.id,
    value: match.groups?.value,
  }));

export const parseMarkdown = async (s: string) => {
  const vfile = await markdownParser.process(s);
  return `${vfile}`;
};

import rehypeSanitize from "rehype-sanitize";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remark2Rehype from "remark-rehype";
import { unified } from "unified";

export const dangerousMarkdownParser = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remark2Rehype, { allowDangerousHtml: true })
  .use(rehypeSlug)
  .use(rehypeStringify, { allowDangerousHtml: true });

export const markdownParser = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remark2Rehype)
  .use(rehypeSlug)
  .use(rehypeStringify)
  .use(rehypeSanitize);

import type { GuideType } from "@/data/guides/guide.schema";

import fs from "fs/promises";
import { basename, join } from "path";

import { globby } from "globby";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remark2Rehype from "remark-rehype";
import { unified } from "unified";
import { parse as parseYaml } from "yaml";

import { Guide } from "@/data/guides/guide.schema";
import { Meta } from "@/data/guides/meta.schema";

const GUIDES_DIR = join(process.cwd(), "src/data/guides");

// only god knows the hell is going on here
// honestly try not to get lost in all the
// remark, unified, rehype and etc. repos

const parser = unified()
  .use(remarkParse)
  .use(remarkFrontmatter, ["yaml"])
  .use(() => (tree, file) => {
    const meta = tree.children.find((c) => c.type === "yaml");
    if (meta != null) {
      if ("value" in meta) {
        file.data.meta = parseYaml(meta.value);
      }
    }
  })
  .use(remarkGfm)
  .use(remark2Rehype, { allowDangerousHtml: true })
  .use(rehypeSlug)
  .use(rehypeStringify, { allowDangerousHtml: true });

export const parseMarkdown = async (content: Buffer) => {
  return await parser.process(content);
};

export const readGuideMarkdown = async (id: string, locale: string) => {
  const guideMd = await fs.readFile(join(GUIDES_DIR, locale, `${id}.md`));
  const guideProcessed = await parseMarkdown(guideMd);

  return guideProcessed;
};

/**
 * @returns a guide for specified character with specified locale
 */
export const getGuide = async (id: string, locale: string): Promise<GuideType> => {
  const vfile = await readGuideMarkdown(id, locale);
  const meta = Meta.parse(vfile.data.meta);
  const html = vfile.toString();

  return Guide.parse({ meta, html });
};

/**
 * @returns an array of all available guides for specified locale
 */
export const getAllGuides = async (locale: string): Promise<GuideType[]> => {
  const paths = await globby(join(GUIDES_DIR, locale, "*.md"));

  const guides = await Promise.all(
    paths.map(async (p) => {
      const fileBasename = basename(p, ".md");
      const guide = await getGuide(fileBasename, locale);

      return guide;
    }),
  );

  return guides;
};

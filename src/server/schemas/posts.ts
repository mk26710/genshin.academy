import { PostType } from "@prisma/client";
import { z } from "zod";

import nextConfig from "next.config.mjs";

export const PostsNewOrEditForm = z.object({
  title: z.string().min(3),
  description: z.string().min(3),
  slug: z
    .string()
    .min(3, "Slug must have at least 3 characters.")
    .regex(/^[\w\d]+(?:-[\w\d]+)*$/gi, 'Slug must contain only latin characters and dashes ("-").'),
  lang: z.union([z.literal("en"), z.literal("ru")]),
  type: z.custom<PostType>((data) => `${data}` in PostType),
  thumbnail: z.string().url(),
  tags: z.string().min(2),
  text: z.string().min(1, "Text must contain at least one character."),
});

const langValidator = (val: unknown) =>
  typeof val === "string" && nextConfig.i18n.locales.includes(val);
const typeValidator = (val: unknown) => typeof val === "string" && val in PostType;
const queryTransformer = (val: unknown) =>
  typeof val === "string" && val.length > 0 ? val : undefined;

export const PostsSearch = z.object({
  skip: z.number(),
  take: z.number(),
  query: z.string().transform(queryTransformer).optional(),
  lang: z.array(z.custom<string>(langValidator, { message: "Incorrect language provided" })),
  order: z.union([z.literal("asc"), z.literal("desc")]).default("desc"),
  authorName: z.string().optional(),
  type: z.custom<PostType>(typeValidator, { message: "Incorrect post type provided" }).optional(),
});

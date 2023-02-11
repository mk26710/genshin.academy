import { PostType } from "@prisma/client";
import { z } from "zod";

import { isObjectValue } from "~/utils/helpers";

export const NewPostSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(3),
  slug: z
    .string()
    .min(3, "Slug must have at least 3 characters.")
    .regex(/^[\w\d]+(?:-[\w\d]+)*$/gi, 'Slug must contain only latin characters and dashes ("-").'),
  lang: z.union([z.literal("en"), z.literal("ru")]),
  type: z.custom<PostType>((data) => isObjectValue(data, PostType)),
  thumbnail: z.string().url(),
  tags: z.string().min(2),
  text: z.string().min(1, "Text must contain at least one character."),
});

export type NewPostForm = z.infer<typeof NewPostSchema>;

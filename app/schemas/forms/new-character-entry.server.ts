import isLocale from "validator/lib/isLocale";
import { z } from "zod";

export const NewCharacterEntrySchema = z.object({
  metaId: z.string().trim(),
  locale: z
    .string()
    .trim()
    .refine((val) => isLocale(val), "Incorrect locale format"),
  name: z.string().trim().min(1),
  title: z.string().nullish(),
  description: z.string().nullish(),
  affiliation: z.string().nullish(),
  constellation: z.string().nullish(),
});

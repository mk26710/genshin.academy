import { z } from "zod";

export const Guide = z
  .object({
    id: z.string(),
    html: z.string(),
  })
  .strict();

export type GuideType = z.infer<typeof Guide>;

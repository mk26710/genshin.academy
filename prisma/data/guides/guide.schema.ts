import { z } from "zod";

import { Meta } from "./meta.schema";

export const Guide = z.object({
  meta: Meta,
  html: z.string(),
});
export type GuideType = z.infer<typeof Guide>;

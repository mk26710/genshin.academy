import { z } from "zod";

export const GuideTypes = z.union([z.literal("character"), z.literal("general")]);
export type GuideTypesType = z.infer<typeof GuideTypes>;

export const MetaRest = z.record(z.union([z.string(), z.number()]));
export type MetaRestType = z.infer<typeof MetaRest>;

export const MetaRequired = z.object({
  id: z.string(),
  type: GuideTypes,
});
export type MetaRequiredType = z.infer<typeof MetaRequired>;

export const Meta = MetaRequired.and(MetaRest);
export type MetaType = z.infer<typeof Meta>;

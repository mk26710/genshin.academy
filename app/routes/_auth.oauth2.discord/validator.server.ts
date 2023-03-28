import { z } from "zod";

export const OAuathTypeSchema = z.union([z.literal("link"), z.literal("signin")]);
export type OAuthType = z.infer<typeof OAuathTypeSchema>;

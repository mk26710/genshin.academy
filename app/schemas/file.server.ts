import { z } from "~/lib/zod.server";

export const AllowedMimeTypes = z.union([
  z.literal("image/png"),
  z.literal("image/avif"),
  z.literal("image/jpeg"),
  z.literal("image/gif"),
  z.literal("image/webp"),
]);

export const FileUpload = z.object({
  file: z.instanceof(File),
  name: z.string().optional().nullish(),
});

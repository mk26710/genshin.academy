import { CharacterAssetType } from "@prisma/client";
import { z } from "zod";

import { isObjectValue } from "~/utils/helpers";

export const NewCharacterAssetSchema = z.object({
  characterMetaId: z.string().trim(),
  type: z
    .string()
    .trim()
    .pipe(z.custom<CharacterAssetType>((data) => isObjectValue(data, CharacterAssetType))),
  name: z.string().trim(),
  url: z.string().trim().url(),
  isPublic: z.coerce.boolean(),
});

export type NewCharacterAsset = z.infer<typeof NewCharacterAssetSchema>;

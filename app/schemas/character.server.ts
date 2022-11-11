import { GenshinVision, GenshinWeapon } from "@prisma/client";

import { z } from "~/lib/zod.server";

export const NewCharacter = z.object({
  id: z
    .string()
    .min(3)
    .regex(/[\Sa-z_-]+/gi, "ID must contain lower case, latin and non whitespace characters only."),
  name: z.string().min(1),
  description: z.string().min(1),
  accentColor: z.string().min(7).max(7),
  rarity: z.number().int().min(1).max(5),
  weapon: z.custom<GenshinWeapon>(
    (val) => Object.values(GenshinWeapon).findIndex((entry) => entry === val) !== -1,
  ),
  vision: z.custom<GenshinVision>(
    (val) => Object.values(GenshinVision).findIndex((entry) => entry === val) !== -1,
  ),
  birthDay: z.number().int().min(1).max(31),
  birthMonth: z.number().int().min(1).max(12),
  iconBlob: z.instanceof(Blob),
  avatarBlob: z.instanceof(Blob),
  cardBlob: z.instanceof(Blob),
});

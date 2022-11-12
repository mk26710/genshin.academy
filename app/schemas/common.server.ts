import { z } from "~/lib/zod.server";

export const UIntNumericString = z.string().regex(/^\d+$/).transform(Number);

import { z } from "zod";

import { PasswordSchema, UserNameSchema } from "../user.server";

export const SignUpForm = z
  .object({
    username: UserNameSchema,
    password: PasswordSchema,
    confirm: PasswordSchema,
  })
  .refine(({ password, confirm }) => password === confirm, {
    path: ["confirm"],
    message: "Passwords don't match",
  });

import { PermissionFlag, UserRole } from "@prisma/client";

import { z } from "~/lib/zod.server";

export const UserNameSchema = z
  .string()
  .trim()
  .min(3, "Username must contain at least 3 characters.")
  .max(50, "Username must not exceed 50 characters.")
  .regex(/^[a-z_\d]+$/, "Username must contain only lowercase latin characters, digits and _.")
  .transform((s) => s.toLowerCase());

export const PasswordSchema = z
  .string()
  .trim()
  .min(8, "Password must contain at least 8 characters.")
  .max(128, "Password must not exceed 128 characters.");

export const UserNameAndPassword = z.object({
  name: UserNameSchema,
  password: PasswordSchema,
});

export const PasswordNewPasswordRepeatNew = z
  .object({
    currentPassword: PasswordSchema,
    newPassword: PasswordSchema,
    newPasswordRepeat: PasswordSchema,
  })
  .refine((obj) => obj.newPassword === obj.newPasswordRepeat, {
    message: "Repeated password doesn't match the new password.",
    path: ["newPasswordRepeat"],
  });

export const UserRolesTitles = z.array(
  z.custom<UserRole>(
    (val) => typeof val === "string" && Object.values(UserRole).includes(val as UserRole),
  ),
);

export const UserPermissions = z.array(
  z.custom<PermissionFlag>(
    (val) =>
      typeof val === "string" && Object.values(PermissionFlag).includes(val as PermissionFlag),
  ),
);

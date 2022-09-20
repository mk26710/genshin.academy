import type { Role, User } from "@prisma/client";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type UserWithRole = Record<any, unknown> & { role: User["role"] | null | undefined };

/** Checks if specfied object's role is inlcuded in provided list of allowed roles.
 *
 * This will return `false` if a `userWithRole` is a nullish value and also if
 * `userWithRole#role` is nullish too.
 *
 * This will throw a `TypeError` if `userWithRole` doesn't have a `role` property.
 */
export const userHasAnyRole = (userWithRole?: UserWithRole, ...allowedRoles: Role[]) => {
  if (userWithRole == null) {
    return false;
  }

  if (!("role" in userWithRole)) {
    throw TypeError(`Provided object doesn't have a "role" property.`);
  }

  if (userWithRole.role == null) {
    return false;
  }

  return allowedRoles.includes(userWithRole.role);
};

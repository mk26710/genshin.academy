import type { Role, User } from "@prisma/client";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type UserWithRole = Record<any, unknown> & Pick<User, "role">;

/** Checks if specfied object's role is inlcuded in provided list of allowed roles */
export const userHasAnyRole = (userWithRole: UserWithRole, ...allowedRoles: Role[]) => {
  if (!("role" in userWithRole)) {
    throw TypeError(`Provided object doesn't have a "role" property.`);
  }

  return allowedRoles.includes(userWithRole.role);
};

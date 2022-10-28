import type { GetUser } from "./session.server";
import type { UserRole, UserRoles } from "@prisma/client";

import { PermissionFlag } from "@prisma/client";

export function isPermissionFlag(value: unknown): value is PermissionFlag {
  if (typeof value !== "string") {
    return false;
  }

  if (value in PermissionFlag) {
    return true;
  }

  return false;
}

export type PermissionValue = PermissionFlag | undefined | null | boolean;

/**
 * Generates an array of `PermissionFlag`s
 */
export function permissions(...input: PermissionValue[]) {
  const result: PermissionFlag[] = [];

  input.flat().forEach((value) => {
    if (isPermissionFlag(value)) {
      result.push(value);
    }
  });

  return result;
}

type UserWithId = Record<string, unknown> & Pick<NonNullable<GetUser>, "id">;
type UserWithPermissions = Record<string, unknown> & Pick<NonNullable<GetUser>, "permissions">;

export enum ValidationMode {
  STRICT = "STRICT",
  SOFT = "SOFT",
}

const DEFAULT_VALIDATION = ValidationMode.SOFT;

export function validatePermissions(
  permissions?: PermissionFlag[],
  validFlags?: PermissionFlag[],
  mode: ValidationMode = DEFAULT_VALIDATION,
) {
  if (typeof permissions === "undefined") return false;
  if (permissions.includes(PermissionFlag.ABSOLUTE_POWER)) return true;
  if (typeof validFlags === "undefined") return false;

  if (mode === ValidationMode.SOFT) {
    return permissions.some((flag) => validFlags.includes(flag));
  }

  if (mode === ValidationMode.STRICT) {
    return validFlags.every((validFlag) => permissions.includes(validFlag));
  }

  return false;
}

export function validateUserPermissions(
  user: UserWithPermissions | null | undefined,
  validFlags: PermissionFlag[] = [],
  mode: ValidationMode = DEFAULT_VALIDATION,
) {
  if (!user) return false;

  const userPermissionFlags = user.permissions.map(({ value }) => value);
  return validatePermissions(userPermissionFlags, validFlags, mode);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type UserWithRole = Record<any, unknown> & { roles: Array<Pick<UserRoles, "title">> };

/** Checks if a user has one of the `allowedRoles`.
 *
 * This will return `false` if a `userWithRole` is a nullish value and also if
 * `userWithRole#role` is nullish too.
 *
 * This will throw a `TypeError` if `userWithRole` doesn't have a `role` property.
 */
export const userHasAnyRole = (userWithRoles?: UserWithRole, ...allowedRoles: UserRole[]) => {
  if (userWithRoles == null) {
    return false;
  }

  if (!("roles" in userWithRoles)) {
    throw TypeError(`Provided object doesn't have a "roles" property.`);
  }

  if (userWithRoles.roles == null) {
    return false;
  }

  // project owner can do anything
  // kinda debatable if it should be explicit or not
  if (userWithRoles.roles.some(({ title }) => title === "OWNER")) {
    return true;
  }

  return userWithRoles.roles.some(({ title }) => allowedRoles.includes(title));
};

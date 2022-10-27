import type { GetUser } from "./session.server";
import type { Post, UserRole, User, UserRoles } from "@prisma/client";

import { PermissionFlag } from "@prisma/client";

import { isNil } from "./helpers";

type UserWithPermissions = Record<string, unknown> & Pick<NonNullable<GetUser>, "permissions">;

export function userHasAccess(user?: UserWithPermissions, ...flags: PermissionFlag[]) {
  if (!user) return false;

  const userFlags = user.permissions.map(({ value }) => value);
  return hasAccess({ target: userFlags, allowed: flags });
}

type HasAccessOptions = {
  target?: Array<PermissionFlag> | null;
  allowed: Array<PermissionFlag>;
};

export function hasAccess(options?: HasAccessOptions) {
  if (isNil(options)) {
    return false;
  }

  const permissions = options.target;
  if (isNil(permissions)) {
    return false;
  }

  if (permissions.some((flag) => flag === PermissionFlag.ABSOLUTE_POWER)) {
    return true;
  }

  return permissions.some((flag) => options.allowed.includes(flag));
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

type UserWithRolesAndId = UserWithRole & { id: User["id"] | null | undefined };
type PostWithAuthorId = Record<string, unknown> & Pick<Post, "authorId">;

/** Check if specified user has permissions to delete specified post */
export const canUserDeletePost = (user: Nil<UserWithRolesAndId>, post?: PostWithAuthorId) => {
  if (user == null || post == null) {
    return false;
  }

  if (userHasAnyRole(user, "MODERATOR", "ADMIN")) {
    return true;
  }

  if (user.id === post.authorId) {
    return true;
  }

  return false;
};

type PostLikeObject = Record<string, unknown> & Pick<Post, "authorId">;

export const canUserEditPost = (user: Nil<UserWithRolesAndId>, post: Nil<PostLikeObject>) => {
  if (user == null || post == null) {
    return false;
  }

  if (user.id === post.authorId || userHasAnyRole(user, "ADMIN", "MODERATOR")) {
    return true;
  }

  return false;
};

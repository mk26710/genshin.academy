import type { Post, UserRole, User } from "@prisma/client";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type UserWithRole = Record<any, unknown> & { roles: UserRole[] | null | undefined };

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

  if (!("role" in userWithRoles)) {
    throw TypeError(`Provided object doesn't have a "role" property.`);
  }

  if (userWithRoles.roles == null) {
    return false;
  }

  // project owner can do anything
  // kinda debatable if it should be explicit or not
  if (userWithRoles.roles.includes("OWNER")) {
    return true;
  }

  return userWithRoles.roles.some((role) => allowedRoles.includes(role));
};

type UserWithRoleAndId = UserWithRole & { id: User["id"] | null | undefined };
type PostWithAuthorId = Record<string, unknown> & Pick<Post, "authorId">;

/** Check if specified user has permissions to delete specified post */
export const canUserDeletePost = (user?: UserWithRoleAndId, post?: PostWithAuthorId) => {
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
type UserLikeObject = Record<string, unknown> & {
  id: User["id"];
  roles: UserRole[];
};

export const canUserEditPost = (user: Nil<UserLikeObject>, post: Nil<PostLikeObject>) => {
  if (user == null || post == null) {
    return false;
  }

  if (user.id === post.authorId || userHasAnyRole(user, "ADMIN", "MODERATOR")) {
    return true;
  }

  return false;
};

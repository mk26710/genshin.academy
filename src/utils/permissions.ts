import type { Post, Role, User } from "@prisma/client";

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
  role: User["role"];
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

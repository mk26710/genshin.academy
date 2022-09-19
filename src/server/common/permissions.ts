import type { Role } from "@prisma/client";

export const minimumRoleWriter = (role: Role | undefined | null) => {
  if (role === "ADMIN" || role === "MODERATOR" || role === "WRITER") {
    return true;
  }

  return false;
};

export const minimumRoleModerator = (role: Role | undefined | null) => {
  if (role === "ADMIN" || role === "MODERATOR") {
    return true;
  }

  return false;
};

export const minimumRoleAdmin = (role: Role | undefined | null) => {
  if (role === "ADMIN") {
    return true;
  }

  return false;
};

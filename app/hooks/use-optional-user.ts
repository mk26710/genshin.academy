import type { GetUser } from "~/utils/session.server";
import { useRouteLoaderData } from "@remix-run/react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isUser(user: any): user is NonNullable<GetUser> {
  if (user == null || typeof user !== "object") {
    return false;
  }

  if (!("id" in user)) {
    return false;
  }

  if (!("name" in user)) {
    return false;
  }

  if (typeof user.id !== "string") {
    return false;
  }

  if (typeof user.name !== "string") {
    return false;
  }

  return true;
}

export const useOptionalUser = (): GetUser | undefined => {
  const data = useRouteLoaderData("root");

  if (data == null || typeof data !== "object") {
    return undefined;
  }

  if (!("user" in data)) {
    return undefined;
  }

  if (!isUser(data.user)) {
    return undefined;
  }

  return data.user;
};

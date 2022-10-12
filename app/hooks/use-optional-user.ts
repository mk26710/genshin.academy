import type { GetUser } from "~/utils/session.server";

import { useMatchesData } from "./use-matches-data";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isUser(user: any): user is NonNullable<GetUser> {
  return user && typeof user === "object" && typeof user.name === "string";
}

export const useOptionalUser = (): GetUser | undefined => {
  const data = useMatchesData("root");
  if (!data || !isUser(data.user)) {
    return undefined;
  }
  return data.user;
};

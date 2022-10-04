import type { getUser } from "~/utils/session.server";
import { useMatchesData } from "./use-matches-data";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isUser(user: any): user is NonNullable<Awaited<ReturnType<typeof getUser>>> {
  return user && typeof user === "object" && typeof user.name === "string";
}

export const useOptionalUser = (): Awaited<ReturnType<typeof getUser>> | undefined => {
  const data = useMatchesData("root");
  if (!data || !isUser(data.user)) {
    return undefined;
  }
  return data.user;
};

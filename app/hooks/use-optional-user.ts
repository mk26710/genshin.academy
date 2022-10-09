import { useCatch } from "@remix-run/react";
import type { GetUser } from "~/utils/session.server";
import { useMatchesData } from "./use-matches-data";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isUser(user: any): user is NonNullable<GetUser> {
  return user && typeof user === "object" && typeof user.name === "string";
}

export const useOptionalUser = (): GetUser | undefined => {
  const data = useMatchesData("root");

  const caught = useCatch();
  const caughtData = caught.data;

  if (data && typeof data === "object" && "user" in data && isUser(data.user)) {
    return data.user;
  }

  if (caught && typeof caughtData === "object" && "user" in caughtData && isUser(caughtData.user)) {
    return caughtData.user;
  }

  return undefined;
};

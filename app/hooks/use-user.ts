import type { getUser } from "~/utils/session.server";

import { useOptionalUser } from "./use-optional-user";

export const useUser = (): NonNullable<Awaited<ReturnType<typeof getUser>>> => {
  const maybeUser = useOptionalUser();
  if (!maybeUser) {
    throw new Error(
      "No user found in root loader, but user is required by useUser. If user is optional, try useOptionalUser instead.",
    );
  }
  return maybeUser;
};

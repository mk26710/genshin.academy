import type { Role } from "@prisma/client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface AuthorizationError {
  message: string;
}

type AuthorizedSessionOptions = {
  required?: boolean;
  allowedRoles?: Role[];
};

/**
 * Returns session data with custom authorization error.
 *
 * If current user's role is not on the `allowedRoles` list
 * and `required` is set to `true` (default), user will be
 * redirected to profile page
 */
export const useAuthorizedSession = ({
  required = true,
  allowedRoles: allowed = [],
}: AuthorizedSessionOptions) => {
  const router = useRouter();
  const [error, setError] = useState<AuthorizationError | null>(null);

  const session = useSession({
    required: required,
    onUnauthenticated: () => {
      if (required) {
        const url = router.locale != null ? `/${router.locale}/me` : "/me";
        router.push(url);
      }
    },
  });

  useEffect(() => {
    if (session.status === "authenticated" && session.data != null && session.data.user != null) {
      if (!allowed.includes(session.data.user.role)) {
        setError({ message: "Unauthorized Request." });
      }
    }
  }, [session.status, session.data?.user]);

  return { ...session, error };
};

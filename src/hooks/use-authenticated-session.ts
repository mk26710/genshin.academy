import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

interface UseAuthOptions {
  redirect?: string;
}

export const useAuthenticatedSession = (options?: UseAuthOptions) => {
  const router = useRouter();

  const sessionData = useSession({
    required: true,
    onUnauthenticated: () => {
      router.push(options?.redirect ?? "/signin");
    },
  });

  return sessionData;
};

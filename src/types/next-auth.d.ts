import type { Role } from "@prisma/client";
import type { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user?: {
      id: string;
      createdAt: string;
      role: Role;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    createdAt: Date;
    role: Role;
  }
}

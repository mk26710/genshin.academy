import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { type NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

// Prisma adapter for NextAuth, optional and can be removed
import { env } from "@/env/server.mjs";
import { prisma } from "@/server/db/client";

export const authOptions: NextAuthOptions = {
  callbacks: {
    async signIn({ account }) {
      if (account.provider === "discord") {
        const allowedEntity = await prisma.allowedDiscordIds.findFirst({
          where: { id: account.providerAccountId },
        });

        if (allowedEntity?.id === account.providerAccountId) {
          return true;
        }
      }

      return false;
    },
    // Include more use data and hide email on session
    session({ session, user }) {
      if (session.user) {
        session.user.email = null;
        session.user.id = user.id;
        session.user.role = user.role;
        session.user.createdAt = user.createdAt.toISOString();
      }

      return session;
    },
  },
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
  pages: {
    signIn: "/signin",
  },
};

export default NextAuth(authOptions);

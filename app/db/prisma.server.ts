import { PrismaClient } from "@prisma/client";

import { requiredServerEnv } from "~/utils/helpers.server";

requiredServerEnv("DATABASE_URL");

let prisma: PrismaClient;

declare global {
  // eslint-disable-next-line no-var
  var __db__: PrismaClient;
}

// this is needed because in development we don't want to restart
// the server with every change, but we want to make sure we don't
// create a new connection to the DB with every change either.
// in production we'll have a single connection to the DB.
if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient({ errorFormat: "minimal" });
  console.log("[PROD] Prisma client created");
} else {
  if (!global.__db__) {
    global.__db__ = new PrismaClient({
      errorFormat: "minimal",
      log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    });
    console.log("[DEV] Prisma client created");
  }
  prisma = global.__db__;
  prisma.$connect();
  console.log("[DEV] Prisma client connected");
}

export { prisma };

import Redis from "ioredis";
import invariant from "tiny-invariant";

let redis: Redis;

declare global {
  // eslint-disable-next-line no-var
  var __redis__: Redis;
}

invariant(process.env.REDIS_URL, "REDIS_URL env variable must exist!");

// this is needed because in development we don't want to restart
// the server with every change, but we want to make sure we don't
// create a new connection to the DB with every change either.
// in production we'll have a single connection to the DB.
if (process.env.NODE_ENV === "production") {
  redis = new Redis(process.env.REDIS_URL);
  console.log("[PROD] Redis client created");
} else {
  if (!global.__redis__) {
    global.__redis__ = new Redis(process.env.REDIS_URL);
    console.log("[DEV] Redis client created");
  }
  redis = global.__redis__;
}

export { redis };

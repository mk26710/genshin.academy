import type { PermissionFlag, User } from "@prisma/client";
import type { MaybePromise } from "~/types/common";

import {
  createCookie,
  createSession,
  createSessionStorage,
  redirect,
  Response,
} from "@remix-run/node";
import { createId } from "@paralleldrive/cuid2";
import dayjs from "dayjs";
import invariant from "tiny-invariant";

import { redis } from "~/db/redis.server";
import { getUserById } from "~/models/user.server";

import { txt, typedError, unauthorized } from "./responses.server";

invariant(process.env.SESSION_SECRET, "SESSION_SECRET must be set");

const SESSION_MAX_AGE = 172800; // 2 days
const SESSION_USER_KEY = "userId";
const SESSION_REDIS_PREFIX = "zenless:session:";
const SESSION_COOKIE_NAME = "__session";

export const sessionCookie = createCookie(SESSION_COOKIE_NAME, {
  maxAge: SESSION_MAX_AGE,
  httpOnly: true,
  path: "/",
  sameSite: "lax",
  secrets: [process.env.SESSION_SECRET],
  secure: process.env.NODE_ENV === "production",
});

export const sessionStorage = createSessionStorage({
  cookie: sessionCookie,
  createData: async (data, expires = dayjs().add(SESSION_MAX_AGE, "seconds").toDate()) => {
    const sessionId = createId();

    const now = dayjs();
    const seconds = Math.abs(now.diff(expires, "seconds"));

    await redis.setex(SESSION_REDIS_PREFIX + sessionId, seconds, data.userId);

    return sessionId;
  },
  readData: async (id) => {
    const userId = await redis.get(SESSION_REDIS_PREFIX + id);
    if (!userId) {
      return null;
    }

    return { userId };
  },
  updateData: async (id, data, expires) => {
    const now = dayjs();
    const seconds = Math.abs(now.diff(expires, "seconds"));

    await redis.setex(SESSION_REDIS_PREFIX + id, seconds, data.userId);
  },
  deleteData: async (id) => {
    console.log("deleting session " + id);
    await redis.del(SESSION_REDIS_PREFIX + id);
  },
});

export const getSession = async (request: Request) => {
  const cookie = request.headers.get("Cookie");
  return sessionStorage.getSession(cookie);
};

export const createUserSession = async ({
  request,
  userId,
  remember,
  redirectTo,
}: {
  request: Request;
  userId: string;
  remember: boolean;
  redirectTo: string;
}) => {
  const currentSession = await getSession(request);
  if (currentSession.id) {
    await sessionStorage.destroySession(currentSession);
    console.log("> Visitor had a cookie with terminated session data, attempted to destroy it.");
  }

  const newSession = createSession({ [SESSION_USER_KEY]: userId }, createId());
  const setCookie = await sessionStorage.commitSession(newSession, {
    maxAge: remember ? SESSION_MAX_AGE : undefined,
  });

  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": setCookie,
    },
  });
};

export const logout = async (request: Request, redirectTo?: string | null) => {
  const session = await getSession(request);
  const headers = new Headers();

  headers.append("Set-Cookie", await sessionStorage.destroySession(session));

  const searchParams = new URLSearchParams([
    ["redirectTo", redirectTo === null ? "/" : new URL(request.url).pathname],
  ]);

  return redirect(`/signin?${searchParams}`, { headers: headers });
};

export const getUserId = async (request: Request): Promise<User["id"] | undefined> => {
  const session = await getSession(request);
  const userId = session.get(SESSION_USER_KEY);
  return userId;
};

export const getUser = async (request: Request) => {
  const userId = await getUserId(request);
  if (!userId) {
    return null;
  }

  const user = await getUserById(userId);
  if (user) {
    if (user.enabled !== true) {
      throw new Response("Disabled Account", {
        status: 403,
        statusText: "Disabled Account",
      });
    }

    return user;
  }

  throw await logout(request);
};

export type GetUser = Awaited<ReturnType<typeof getUser>>;

export const requireUser = async (request: Request) => {
  const session = await getSession(request);
  const userId = session.get(SESSION_USER_KEY);

  if (!userId) {
    throw await logout(request);
  }

  const user = await getUserById(userId);

  if (!user) {
    throw await logout(request);
  }

  if (user.enabled !== true) {
    throw new Response("Disabled Account", {
      status: 403,
      statusText: "Disabled Account",
    });
  }

  return user;
};

type VerifyFlagsOptions = {
  flags: PermissionFlag[];
  required: PermissionFlag[];
};

export const verifyEveryFlag = (opts: VerifyFlagsOptions) => {
  if (opts.flags.includes("ABSOLUTE_POWER")) {
    return true;
  }

  return opts.required.every((rf) => opts.flags.some((cf) => cf === rf));
};

export const requireUserWithEveryFlag = async (
  request: Request,
  requiredFlags: PermissionFlag[],
) => {
  const user = await requireUser(request);
  const userFlags = user.permissions.map(({ value }) => value);

  const isAllowed = verifyEveryFlag({
    flags: userFlags,
    required: requiredFlags,
  });

  if (!isAllowed) {
    throw txt("Forbidden", 403);
  }

  return user;
};

type AuthorizationPredicate = (
  user: Awaited<ReturnType<typeof requireUser>>,
) => MaybePromise<boolean>;

export const authorizeUser = async (
  request: Request,
  predicate: AuthorizationPredicate | boolean,
) => {
  const user = await requireUser(request);

  let result = false;
  if (typeof predicate === "boolean") {
    result = predicate;
  } else if (typeof predicate === "function") {
    result = await predicate(user);
  } else {
    throw new TypeError("predicate must be a function that returns a boolean or a boolean value.");
  }

  if (result === false) {
    throw unauthorized(typedError({ error: { message: "Authorization failed" } }));
  }

  return user;
};

import type { User } from "@prisma/client";

import { createCookie, createSession, createSessionStorage, redirect } from "@remix-run/node";
import cuid from "cuid";
import dayjs from "dayjs";
import invariant from "tiny-invariant";

import { redis } from "~/db/redis.server";
import { getUserById } from "~/models/user.server";

import { jsonError, text } from "./responses.server";

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
    const sessionId = cuid();

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  const newSession = createSession({ [SESSION_USER_KEY]: userId }, cuid());
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

  return redirect(`/login?${searchParams}`, { headers: headers });
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
    if (user.enabled !== true)
      throw jsonError(
        { code: "user.disabled", message: "Your account is disabled." },
        { status: 403 },
      );
    return user;
  }

  throw await logout(request);
};

export type GetUser = Awaited<ReturnType<typeof getUser>>;

export const ensureAuthenticatedUser = async (request: Request) => {
  const session = await getSession(request);
  const userId = session.get(SESSION_USER_KEY);

  if (!userId) {
    throw await logout(request);
  }

  const user = await getUserById(userId);

  if (!user) {
    throw await logout(request);
  }

  return user;
};

export const ensureAuthorizedUser = async (
  request: Request,
  predicate:
    | ((user: Awaited<ReturnType<typeof ensureAuthenticatedUser>>) => Promise<boolean>)
    | boolean,
) => {
  const user = await ensureAuthenticatedUser(request);

  let result = false;
  if (typeof predicate === "boolean") {
    result = predicate;
  } else if (typeof predicate === "function") {
    result = await predicate(user);
  } else {
    throw new TypeError("predicate must be a function that returns a boolean or a boolean value.");
  }

  if (result === false) {
    throw text("Forbidden", { status: 403 });
  }

  return user;
};

// export async function requireUserId(
//   request: Request,
//   redirectTo: string = new URL(request.url).pathname,
// ) {
//   const userId = await getUserId(request);
//   if (!userId) {
//     const searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
//     throw redirect(`/login?${searchParams}`, {
//       headers: {
//         "Set-Cookie": `${SESSION_COOKIE_NAME}=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`,
//       },
//     });
//   }
//   return userId;
// }

// export async function requireUser(request: Request) {
//   const userId = await requireUserId(request);

//   const user = await getUserById(userId);
//   if (user) return user;

//   throw await logout(request);
// }

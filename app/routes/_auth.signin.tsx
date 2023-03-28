import type { ActionArgs, HeadersFunction, LoaderArgs } from "@remix-run/node";

import { json, redirect } from "@remix-run/node";
import { Form, Link, useActionData, useLoaderData, useSearchParams } from "@remix-run/react";
import { useEffect, useRef } from "react";

import { Main } from "~/components/main";
import { verifyLogin } from "~/models/user.server";
import { safeRedirect } from "~/utils/helpers";
import { getDiscordLoginOAuthURL } from "~/utils/oauth/discord.server";
import { createUserSession, getUserId } from "~/utils/session.server";

export const headers: HeadersFunction = () => ({
  "X-Robots-Tag": "noindex",
});

export const loader = async ({ request }: LoaderArgs) => {
  const userId = await getUserId(request);
  if (userId) return redirect("/");

  const discordOAuthUrl = getDiscordLoginOAuthURL();
  return json({ discordOAuthUrl });
};

export default function AuthLogin() {
  const { discordOAuthUrl } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/";

  const nameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const redirectToDiscord = () => {
    if (typeof window !== "undefined") {
      window.location.href = discordOAuthUrl;
    }
  };

  useEffect(() => {
    if (actionData?.errors?.name) {
      nameRef.current?.focus();
    } else if (actionData?.errors?.password) {
      passwordRef.current?.focus();
    }
  }, [actionData]);

  return (
    <Main>
      <Main.Container
        display="flex"
        flex={1}
        direction="col"
        className="items-center justify-center"
      >
        <div className="w-full max-w-md space-y-8">
          <Form method="post" className="daisy-card mt-8 bg-base-200">
            <div className="daisy-card-body">
              <h2 className="self-center text-xl font-bold">Sigin In</h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                Or{" "}
                <Link to="/signup" className="daisy-link-primary font-medium">
                  create an account
                </Link>
              </p>

              <input type="hidden" name="remember" defaultValue="true" />

              <div className="daisy-form-control">
                <label htmlFor="name" className="diasy-label">
                  <span className="daisy-label-text">Username</span>
                </label>
                <input
                  ref={nameRef}
                  id="name"
                  name="name"
                  type="name"
                  required
                  className="daisy-input-bordered daisy-input relative block w-full"
                  placeholder="coolname123"
                />
              </div>

              <div className="daisy-form-control">
                <label htmlFor="password" className="daisy-label">
                  <span className="daisy-label-text">Password</span>
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="daisy-input-bordered daisy-input relative block w-full"
                  placeholder="superpassword0123"
                />
              </div>
              <input type="hidden" name="redirectTo" value={redirectTo} />

              <div className="daisy-btn-group daisy-btn-group-vertical mt-6">
                <button
                  type="button"
                  onClick={redirectToDiscord}
                  className="daisy-btn-primary daisy-btn w-full"
                >
                  Sign in with Discord
                </button>

                <button type="submit" className="daisy-btn-primary daisy-btn w-full">
                  Sign in
                </button>
              </div>
            </div>
          </Form>
        </div>
      </Main.Container>
    </Main>
  );
}

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const name = formData.get("name");
  const password = formData.get("password");
  const redirectTo = safeRedirect(formData.get("redirectTo"), "/");
  const remember = formData.get("remember");

  if (typeof name !== "string") {
    return json({ errors: { name: "Username is invalid", password: null } }, { status: 400 });
  }

  if (typeof password !== "string" || password.length === 0) {
    return json({ errors: { name: null, password: "Password is required" } }, { status: 400 });
  }

  if (password.length < 8) {
    return json({ errors: { name: null, password: "Password is too short" } }, { status: 400 });
  }

  const user = await verifyLogin(name, password);

  if (!user) {
    return json({ errors: { name: "Invalid name or password", password: null } }, { status: 400 });
  }

  return createUserSession({
    request,
    userId: user.id,
    remember: remember === "on" ? true : false,
    redirectTo,
  });
};

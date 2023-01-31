import type { ActionArgs, HeadersFunction, LoaderArgs, MetaFunction } from "@remix-run/node";
import type { RouteHandle } from "~/types/common";

import { json, redirect } from "@remix-run/node";
import { Form, Link, useActionData, useLoaderData, useSearchParams } from "@remix-run/react";
import * as React from "react";

import { Button } from "~/components/Button";
import { Container } from "~/components/Container";
import { verifyLogin } from "~/models/user.server";
import { safeRedirect } from "~/utils/helpers";
import { getDiscordLoginOAuthURL } from "~/utils/oauth/discord.server";
import { createUserSession, getUserId } from "~/utils/session.server";

export const handle: RouteHandle = {
  id: "login",
  withScrollRestoration: true,
};

export const headers: HeadersFunction = () => ({
  "X-Robots-Tag": "noindex",
});

export async function loader({ request }: LoaderArgs) {
  const userId = await getUserId(request);
  if (userId) return redirect("/");

  const discordOAuthUrl = getDiscordLoginOAuthURL();
  return json({ discordOAuthUrl });
}

export async function action({ request }: ActionArgs) {
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
}

export const meta: MetaFunction = () => {
  return {
    title: "Login",
  };
};

export default function LoginPage() {
  const { discordOAuthUrl } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/";

  const nameRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);

  const redirectToDiscord = () => {
    if (typeof window !== "undefined") {
      window.location.href = discordOAuthUrl;
    }
  };

  React.useEffect(() => {
    if (actionData?.errors?.name) {
      nameRef.current?.focus();
    } else if (actionData?.errors?.password) {
      passwordRef.current?.focus();
    }
  }, [actionData]);

  return (
    <Container className="flex items-center justify-center">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h1 className="mx-auto text-center text-lg font-semibold text-gray-700">
            genshins.academy
          </h1>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <Link to="/join" className="font-medium text-primary-600 hover:text-primary-500">
              create an account
            </Link>
          </p>
        </div>

        <Form method="post" className="mt-8 space-y-6">
          <input type="hidden" name="remember" defaultValue="true" />

          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="name" className="sr-only">
                Username
              </label>
              <input
                ref={nameRef}
                id="name"
                name="name"
                type="name"
                required
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                placeholder="Username"
              />
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <input type="hidden" name="redirectTo" value={redirectTo} />

          <div>
            <Button type="button" onClick={redirectToDiscord} className="w-full rounded-b-none">
              Use Discord
            </Button>

            <Button type="submit" className="w-full rounded-t-none">
              Sign in
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
}

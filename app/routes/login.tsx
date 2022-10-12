import type { ActionArgs, LoaderArgs, MetaFunction } from "@remix-run/node";

import { json, redirect } from "@remix-run/node";
import { Form, Link, useActionData, useSearchParams } from "@remix-run/react";
import * as React from "react";

import { Container } from "~/components/Container";
import { verifyLogin } from "~/models/user.server";
import { safeRedirect } from "~/utils/helpers";
import { createUserSession, getUserId } from "~/utils/session.server";

export async function loader({ request }: LoaderArgs) {
  const userId = await getUserId(request);
  if (userId) return redirect("/");
  return json({});
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const name = formData.get("name");
  const password = formData.get("password");
  const redirectTo = safeRedirect(formData.get("redirectTo"), "/notes");
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
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/";
  const actionData = useActionData<typeof action>();
  const nameRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (actionData?.errors?.name) {
      nameRef.current?.focus();
    } else if (actionData?.errors?.password) {
      passwordRef.current?.focus();
    }
  }, [actionData]);

  return (
    <Container className="flex items-center justify-center">
      <div className="w-full max-w-md px-8">
        <Form method="post" className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <div className="mt-1">
              <input
                ref={nameRef}
                id="name"
                required
                autoFocus={true}
                name="name"
                type="name"
                autoComplete="name"
                aria-invalid={actionData?.errors?.name ? true : undefined}
                aria-describedby="name-error"
                className="input-field w-full"
              />
              {actionData?.errors?.name && (
                <div className="pt-1 text-red-700" id="name-error">
                  {actionData.errors.name}
                </div>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="mt-1">
              <input
                id="password"
                ref={passwordRef}
                name="password"
                type="password"
                autoComplete="current-password"
                aria-invalid={actionData?.errors?.password ? true : undefined}
                aria-describedby="password-error"
                className="input-field w-full"
              />
              {actionData?.errors?.password && (
                <div className="pt-1 text-red-700" id="password-error">
                  {actionData.errors.password}
                </div>
              )}
            </div>
          </div>

          <input type="hidden" name="redirectTo" value={redirectTo} />
          <button type="submit" className="button w-full">
            Log in
          </button>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember"
                name="remember"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="remember" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>
            <div className="text-center text-sm text-gray-500">
              <Link
                className="text-blue-500 underline"
                to={{
                  pathname: "/join",
                  search: searchParams.toString(),
                }}
              >
                Sign up
              </Link>
            </div>
          </div>
        </Form>
      </div>
    </Container>
  );
}

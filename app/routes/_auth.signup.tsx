import type { ActionFunction, HeadersFunction } from "@remix-run/node";

import { Form, Link, useActionData } from "@remix-run/react";

import { Main } from "~/components/main";
import { Button } from "~/components/ui/button";
import { db } from "~/db/prisma.server";
import { createUser } from "~/models/user.server";
import { SignUpForm } from "~/schemas/forms/signup.server";
import { badRequest } from "~/utils/responses.server";
import { createUserSession } from "~/utils/session.server";

export const headers: HeadersFunction = () => ({
  "X-Robots-Tag": "noindex",
});

export default function Signup() {
  const actionData = useActionData<ActionData | undefined>();

  return (
    <Main>
      <Main.Container
        display="flex"
        flex={1}
        direction="col"
        className="items-center justify-center"
      >
        <div className="w-full max-w-md space-y-8">
          <div>
            <h1 className="mx-auto text-center text-lg font-semibold text-gray-700">
              genshins.academy
            </h1>
            <h2 className="mt-2 text-center text-3xl font-bold tracking-tight text-gray-900">
              Create an account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{" "}
              <Link to="/signin" className="font-medium text-primary-600 hover:text-primary-500">
                sign in
              </Link>
            </p>
          </div>

          <Form method="post" className="mt-8 space-y-6">
            <input type="hidden" name="remember" defaultValue="true" />

            <div className="-space-y-px">
              <div>
                <label htmlFor="username" className="sr-only">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="username"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-box border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                  placeholder="Username"
                />
                {actionData?.error?.username != null && (
                  <p className="mb-1 whitespace-pre-line text-red-500">
                    {actionData.error.username}
                  </p>
                )}
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
                  className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                  placeholder="Password"
                />
                {actionData?.error?.password != null && (
                  <p className="mb-1 whitespace-pre-line text-red-500">
                    {actionData.error.password}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="confirm" className="sr-only">
                  Confirm password
                </label>
                <input
                  id="confirm"
                  name="confirm"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-box border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                  placeholder="Confirmation"
                />
                {actionData?.error?.confirm != null && (
                  <p className="whitespace-pre-line text-red-500">{actionData.error.confirm}</p>
                )}
              </div>
            </div>

            <div>
              <Button type="submit" className="w-full rounded-box">
                Sign up
              </Button>
            </div>
          </Form>
        </div>
      </Main.Container>
    </Main>
  );
}

type ActionData = {
  error?: {
    username?: string;
    password?: string;
    confirm?: string;
  };
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const validation = await SignUpForm.safeParseAsync({
    username: formData.get("username"),
    password: formData.get("password"),
    confirm: formData.get("confirm"),
  });

  if (validation.success !== true) {
    const err = validation.error.format();

    return badRequest<ActionData>({
      error: {
        username: err.username?._errors.join("\n"),
        password: err.password?._errors.join("\n"),
        confirm: err.confirm?._errors.join("\n"),
      },
    });
  }

  const { username, password } = validation.data;

  const maybeExistingUser = await db.user.findUnique({ where: { name: username } });
  if (maybeExistingUser != null) {
    return badRequest<ActionData>({
      error: {
        username: "This username is already taken",
        password: undefined,
        confirm: undefined,
      },
    });
  }

  const createdUser = await createUser(username, password);

  return createUserSession({
    request,
    userId: createdUser.id,
    redirectTo: "/",
    remember: false,
  });
};

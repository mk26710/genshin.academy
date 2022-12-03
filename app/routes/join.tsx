import type { ActionArgs, HeadersFunction, LoaderArgs, MetaFunction } from "@remix-run/node";
import type { RouteHandle } from "~/types/common";

import { json, redirect } from "@remix-run/node";
import { Form, Link, useActionData, useSearchParams } from "@remix-run/react";
import * as React from "react";

import { Button } from "~/components/Button";
import { Container } from "~/components/Container";
import { createUser, getUserByName } from "~/models/user.server";
import { UserNameAndPassword } from "~/schemas/user.server";
import { safeRedirect } from "~/utils/helpers";
import { generateMeta } from "~/utils/meta-generator";
import { getUserId, createUserSession } from "~/utils/session.server";

export const handle: RouteHandle = {
  id: "join",
  withScrollRestoration: true,
};

export const headers: HeadersFunction = () => ({
  "X-Robots-Tag": "noindex",
});

export const meta: MetaFunction = () => {
  return generateMeta({
    title: "Registration",
    noIndex: true,
  });
};

export async function loader({ request }: LoaderArgs) {
  const userId = await getUserId(request);
  if (userId) return redirect("/");
  return json({});
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const redirectTo = safeRedirect(formData.get("redirectTo"), "/");

  const safeParse = await UserNameAndPassword.safeParseAsync({
    name: formData.get("name"),
    password: formData.get("password"),
  });

  if (!safeParse.success) {
    return json(
      {
        errors: {
          name: safeParse.error.format().name?._errors.at(0),
          password: safeParse.error.format().password?._errors.at(0),
        },
      },
      { status: 400 },
    );
  }

  const { name, password } = safeParse.data;

  const existingUser = await getUserByName(name);
  if (existingUser) {
    return json(
      {
        errors: {
          name: "A user already exists with this name",
          password: null,
        },
      },
      { status: 400 },
    );
  }

  const user = await createUser(name, password);

  return createUserSession({
    request,
    userId: user.id,
    remember: false,
    redirectTo,
  });
}

export default function Join() {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? undefined;
  const actionData = useActionData<typeof action>();
  const nameRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);

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
                autoComplete="new-password"
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
          <Button color="primary" variant="light" type="submit" className="w-full">
            Create Account
          </Button>
          <div className="flex justify-end">
            <div className="text-center text-sm text-gray-500">
              <Link
                className="text-blue-500 underline"
                to={{
                  pathname: "/login",
                  search: searchParams.toString(),
                }}
              >
                Log in
              </Link>
            </div>
          </div>
        </Form>
      </div>
    </Container>
  );
}

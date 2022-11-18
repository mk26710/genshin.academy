import type { ContextType } from "../$slug";
import type { ActionArgs, HeadersFunction, LoaderArgs } from "@remix-run/node";

import { PermissionFlag } from "@prisma/client";
import { json } from "@remix-run/node";
import { useFetcher, useOutletContext } from "@remix-run/react";
import { useEffect, useState } from "react";

import { Checkbox } from "~/components/Checkbox";
import { Input } from "~/components/Input";
import { z } from "~/lib/zod.server";
import { changePasswordOfUser, getUserById } from "~/models/user.server";
import { UserPassword as PasswordValidator } from "~/schemas/user.server";
import { validateUserPermissions, ValidationMode } from "~/utils/permissions";
import { badRequest, notFound } from "~/utils/responses.server";
import { authorizeUser } from "~/utils/session.server";

export const headers: HeadersFunction = () => ({
  "X-Robots-Tag": "noindex",
});

// this is a very very dangerous route, must allow only owner here
const REQUIRED_FLAGS = [PermissionFlag.ABSOLUTE_POWER];

export const loader = async ({ request }: LoaderArgs) => {
  await authorizeUser(request, (user) =>
    validateUserPermissions(user, REQUIRED_FLAGS, ValidationMode.STRICT),
  );

  return null;
};

export default function UserPassword() {
  const fetcher = useFetcher<typeof action>();

  const { user } = useOutletContext<ContextType>();

  const [isHiddenInput, setIsHiddenInput] = useState(true);

  useEffect(() => {
    if (fetcher.type === "actionReload") {
      alert(JSON.stringify(fetcher.data, null, 2));
    }
  }, [fetcher.state, fetcher.type]);

  return (
    <div className="flex flex-col">
      <Checkbox
        checked={!isHiddenInput}
        onChange={() => setIsHiddenInput((s) => !s)}
        label="Show Password"
      />

      <fetcher.Form method="patch" className="mt-2 flex flex-col" encType="multipart/form-data">
        <input name="user-id" value={user.id} hidden readOnly />

        <div className="mb-2 flex w-full flex-col gap-2 lg:flex-row">
          <div className="mb-2 flex w-full flex-col">
            <label className="text-xs font-bold uppercase opacity-70">New Password</label>
            <Input name="password" type={isHiddenInput ? "password" : "text"} fullWidth />
          </div>

          <div className="flex w-full flex-col">
            <label className="text-xs font-bold uppercase opacity-70">Repeat New Password</label>
            <Input name="password-repeat" type={isHiddenInput ? "password" : "text"} fullWidth />
          </div>
        </div>

        <button type="submit" className="button">
          Save
        </button>
      </fetcher.Form>
    </div>
  );
}

export const action = async ({ request }: ActionArgs) => {
  await authorizeUser(request, (user) =>
    validateUserPermissions(user, REQUIRED_FLAGS, ValidationMode.STRICT),
  );

  const formData = await request.formData();

  const schema = z
    .object({
      userId: z.string(),
      password: PasswordValidator,
      passwordRepeat: PasswordValidator,
    })
    .refine((obj) => obj.password === obj.passwordRepeat, {
      message: "Repeated password doesn't match the new password.",
      path: ["passwordRepeat"],
    });

  const validation = await schema.spa({
    userId: formData.get("user-id"),
    password: formData.get("password"),
    passwordRepeat: formData.get("password-repeat"),
  });

  if (!validation.success) {
    return badRequest({
      error: { message: "Validation failure", cause: validation.error },
      isChanged: null,
    });
  }

  const { password, userId } = validation.data;

  const user = await getUserById(userId);
  if (!user) {
    return notFound({
      error: { message: "User not found" },
      isChanged: null,
    });
  }

  const isChanged = await changePasswordOfUser(user.id, password);

  return json({ error: null, isChanged });
};

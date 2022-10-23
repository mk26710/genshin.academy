import type { ContextType } from "../$slug";
import type { ActionArgs } from "@remix-run/node";
import type { ChangeEvent } from "react";

import { Prisma } from "@prisma/client";
import { redirect, json } from "@remix-run/node";
import { Form, useActionData, useOutletContext } from "@remix-run/react";
import { useRef, useEffect, useState } from "react";

import { prisma } from "~/db/prisma.server";
import { deleteUserById, getUserById } from "~/models/user.server";
import { stringOrUndefined } from "~/utils/helpers";
import { userHasAnyRole } from "~/utils/permissions";
import { ensureAuthorizedUser } from "~/utils/session.server";

export const handle: RouteHandle = {
  id: "yashiro.user.general",
};

type ActionData = {
  date: Date;
  success?: boolean;
  errors?: {
    code?: string;
    message: string;
  };
};

export const action = async ({ request }: ActionArgs) => {
  await ensureAuthorizedUser(request, async (user) => userHasAnyRole(user, "ADMIN"));

  const formData = await request.formData();

  const targetId = formData.get("user.id");
  if (typeof targetId !== "string") {
    return json<ActionData>(
      {
        date: new Date(),
        success: false,
        errors: {
          code: "user.id",
          message: "Target user id was not provided",
        },
      },
      { status: 400 },
    );
  }

  if (request.method === "DELETE") {
    await deleteUserById(targetId);
    return redirect("/yashiro/users");
  }

  const target = await getUserById(targetId);
  if (!target) {
    return json<ActionData>(
      {
        date: new Date(),
        success: false,
        errors: {
          message: "Target user was not found in DB",
        },
      },

      { status: 400 },
    );
  }

  const newName = stringOrUndefined(formData.get("user.name"));
  const newAvatarUrl = stringOrUndefined(formData.get("user.avatarUrl"));
  const newEnabled = formData.get("user.enabled") === "1" ? true : false;

  const updatedAt = new Date();

  try {
    await prisma.user.updateMany({
      where: { id: targetId },
      data: {
        name: newName,
        enabled: newEnabled,
        avatarUrl: newAvatarUrl,
        updatedAt: updatedAt,
      },
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return json<ActionData>(
        {
          date: new Date(),
          success: false,
          errors: {
            message: e.message,
          },
        },
        { status: 400 },
      );
    }

    throw e;
  }

  return json<ActionData>({
    date: new Date(),
    success: true,
  });
};

export default function YashiroUsersSlugRoute() {
  const { user } = useOutletContext<ContextType>();
  const actionData = useActionData<typeof action>();

  const [madeChanges, setMadeChanges] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");

  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!notificationRef.current) {
      return;
    }

    if (typeof actionData === "undefined") {
      return;
    }

    notificationRef.current.classList.remove("hidden");
    setTimeout(() => {
      notificationRef.current?.classList.add("hidden");
    }, 5000);
  }, [actionData?.date, actionData?.success, actionData?.errors]);

  const handleAvatarUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAvatarUrl(e.target.value);
  };

  // detect changes in form
  const handleFormChange = () => {
    if (madeChanges === false) {
      setMadeChanges(true);
    }
  };

  // updates input value on initial load
  useEffect(() => {
    setAvatarUrl(user.avatarUrl ?? "");
  }, []);

  return (
    <div className="flex flex-col">
      <div ref={notificationRef} className="hidden">
        {actionData?.success === true && (
          <div className="card border-emerald-500 bg-emerald-200 text-emerald-700">
            <h2 className="text-sm">User was updated successfully</h2>
          </div>
        )}

        {actionData?.success !== true && actionData?.errors && (
          <div className="card border-red-500 bg-red-200 text-red-700">
            <h2 className="text-sm">Error: {actionData.errors?.message}</h2>
          </div>
        )}
      </div>

      <Form
        replace={true}
        method="patch"
        onChange={handleFormChange}
        className="grid grid-flow-dense grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3"
      >
        <input name="user.id" value={user.id} readOnly hidden />

        <div className="flex flex-col gap-0.5">
          <label htmlFor="user.name" className="text-sm font-semibold uppercase opacity-70">
            Name
          </label>
          <input id="user.name" name="user.name" defaultValue={user.name} className="input-field" />
        </div>

        <input name="user.avatarUrl.old" value={user.avatarUrl ?? undefined} readOnly hidden />

        <div className="flex flex-col gap-0.5">
          <label htmlFor="user.avatarUrl" className="text-sm font-semibold uppercase opacity-70">
            Avatar URL
          </label>
          <input
            id="user.avatarUrl"
            name="user.avatarUrl"
            value={avatarUrl}
            onChange={handleAvatarUrlChange}
            className="input-field"
          />
        </div>

        <div className="flex flex-col gap-0.5">
          <label htmlFor="user.enabled" className="text-sm font-semibold uppercase opacity-70">
            Account Status
          </label>
          <select
            id="user.enabled"
            name="user.enabled"
            className="select-field"
            defaultValue={Number(user.enabled)}
          >
            <option value={1}>Enabled</option>
            <option value={0}>Disabled</option>
          </select>
        </div>
        {madeChanges && <button className="button mt-4 md:col-span-2 lg:col-span-3">Save</button>}
      </Form>
    </div>
  );
}

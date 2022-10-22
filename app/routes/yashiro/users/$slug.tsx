import type { ActionArgs, LoaderArgs, MetaFunction } from "@remix-run/node";
import type { ChangeEvent } from "react";

import { PencilIcon, TrashIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { Prisma } from "@prisma/client";
import { redirect, json } from "@remix-run/node";
import { Form, useActionData, useCatch, useFetcher, useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";

import { Container } from "~/components/Container";
import { UserAvatar } from "~/components/UserAvatar";
import { prisma } from "~/db/prisma.server";
import { deleteUserById, getUserById, getUserByNameOrId } from "~/models/user.server";
import { stringOrUndefined, undefinify } from "~/utils/helpers";
import { generateMeta } from "~/utils/meta-generator";
import { userHasAnyRole } from "~/utils/permissions";
import { text } from "~/utils/responses.server";
import { ensureAuthorizedUser } from "~/utils/session.server";

export const loader = async ({ request, params }: LoaderArgs) => {
  await ensureAuthorizedUser(request, async (user) => userHasAnyRole(user, "ADMIN"));

  if (typeof params?.slug !== "string") {
    throw text("Something went wrong with the slug.", { status: 500 });
  }

  const user = await getUserByNameOrId(params.slug);
  if (!user) {
    throw text("User not found.", { status: 404 });
  }

  return { user };
};

type ActionData = {
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

  return json<ActionData>({ success: true });
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data?.user) {
    return generateMeta({
      title: "User not found",
    });
  }

  return generateMeta({
    title: data.user.name,
    imageUrl: undefinify(data.user.avatarUrl),
  });
};

const YashiroUsersSlugRoute = () => {
  const { user } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  const fetcher = useFetcher();

  const [isEditing, setIsEditing] = useState(false);
  const [madeChanges, setMadeChanges] = useState(false);

  const [avatarUrl, setAvatarUrl] = useState("");

  const handleDeleteClick = () => {
    const yesOrNo = confirm("you sure you wanna delete that user?");
    if (yesOrNo === true) {
      fetcher.submit({ "user.id": user.id }, { method: "delete", replace: true });
    }
  };

  const handleEditClick = () => {
    setIsEditing((val) => !val);
  };

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

  useEffect(() => {
    console.log(user.enabled);
  }, [user]);

  useEffect(() => {
    console.info(actionData);
  }, [actionData]);

  return (
    <Container className="flex flex-col gap-2">
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

      <div className="flex flex-col justify-end gap-2 md:flex-row">
        <button
          onClick={handleEditClick}
          className="button flex w-full flex-row items-center justify-center gap-2 self-end md:w-fit"
        >
          {isEditing ? <XMarkIcon className="h-5 w-5" /> : <PencilIcon className="h-5 w-5" />}
          <span>{isEditing ? "Stop Editing" : "Start Editing"}</span>
        </button>

        <button
          onClick={handleDeleteClick}
          className="button flex w-full flex-row items-center justify-center gap-2 self-end md:w-fit"
        >
          <TrashIcon className="h-5 w-5" />
          <span>Delete user</span>
        </button>
      </div>

      <div className="card relative flex flex-col gap-[var(--default-gap)] md:flex-row">
        <UserAvatar avatarUrl={avatarUrl} className="aspect-square h-32 w-32 self-center" />

        <Form
          replace={true}
          method="patch"
          onChange={handleFormChange}
          className="flex w-full flex-col gap-2"
        >
          <div className="grid w-full grid-flow-dense auto-rows-auto grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <input name="user.id" value={user.id} readOnly hidden />

            <div className="flex flex-col gap-0.5">
              <label htmlFor="user.name" className="text-sm font-semibold uppercase opacity-70">
                Name
              </label>
              <input
                id="user.name"
                name="user.name"
                defaultValue={user.name}
                readOnly={!isEditing}
                className="input-field"
              />
            </div>

            <input name="user.avatarUrl.old" value={user.avatarUrl ?? undefined} readOnly hidden />

            <div className="flex flex-col gap-0.5">
              <label
                htmlFor="user.avatarUrl"
                className="text-sm font-semibold uppercase opacity-70"
              >
                Avatar URL
              </label>
              <input
                id="user.avatarUrl"
                name="user.avatarUrl"
                value={avatarUrl}
                onChange={handleAvatarUrlChange}
                readOnly={!isEditing}
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
                disabled={!isEditing}
              >
                <option value={1}>Enabled</option>
                <option value={0}>Disabled</option>
              </select>
            </div>
          </div>
          {isEditing && madeChanges && <button className="button mt-4">Save</button>}
        </Form>
      </div>
    </Container>
  );
};

export default YashiroUsersSlugRoute;

export const CatchBoundary = () => {
  const caught = useCatch();

  return (
    <Container className="flex items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <h3 className="text-8xl font-bold">{caught.status}</h3>
        <p className="opacity-70">{caught.statusText}</p>
      </div>
    </Container>
  );
};

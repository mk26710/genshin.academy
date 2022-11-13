import type { ContextType } from "../$slug";
import type { ActionArgs, HeadersFunction } from "@remix-run/node";
import type { RouteHandle } from "~/types/common";

import { ArrowUturnLeftIcon, PlusIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { PermissionFlag } from "@prisma/client";
import { Response } from "@remix-run/node";
import { useFetcher, useOutletContext } from "@remix-run/react";
import clsx from "clsx";
import { useEffect, useMemo, useState } from "react";

import { prisma } from "~/db/prisma.server";
import { UserPermissions } from "~/schemas/user.server";
import {
  isPermissionFlag,
  permissions,
  validateUserPermissions,
  ValidationMode,
} from "~/utils/permissions";
import { getAuthorizedUser } from "~/utils/session.server";

export const handle: RouteHandle = {
  id: "yashiro.user.permissions",
  withScrollRestoration: true,
};

export const headers: HeadersFunction = () => ({
  "X-Robots-Tag": "noindex",
});

export default function YashiroUsersSlugPermissions() {
  const fetcher = useFetcher();

  const { user } = useOutletContext<ContextType>();
  const userFlags = user.permissions.map((p) => p.value);

  const [toAdd, setToAdd] = useState<Array<PermissionFlag>>([]);
  const [toDelete, setToDelete] = useState<Array<PermissionFlag>>([]);

  const merged = useMemo(() => [...userFlags, ...toAdd], [toAdd, toDelete, user.permissions]);

  const missingFlags = Object.values(PermissionFlag)
    .filter((flag) => !userFlags.includes(flag))
    .filter((flag) => !toAdd.includes(flag));

  const isBeingAdded = (v: PermissionFlag) => toAdd.includes(v);
  const isBeingDeleted = (v: PermissionFlag) => toDelete.includes(v);

  const save = () => {
    const formData = new FormData();
    formData.set("user.id", user.id);

    toAdd.forEach((flag) => formData.append("permissions.add", flag));
    toDelete.forEach((flag) => formData.append("permissions.delete", flag));

    fetcher.submit(formData, {
      replace: true,
      method: "post",
      encType: "multipart/form-data",
    });
  };

  const handleAdd = (value: PermissionFlag) => {
    const processedValue = value.trim().toUpperCase();
    if (!isPermissionFlag(processedValue)) {
      alert("invalid permission input bro, use these: " + Object.values(PermissionFlag).join(", "));
      return;
    }

    setToAdd((flags) => [...new Set([...flags, processedValue])]);
  };

  const handleDelete = (value: PermissionFlag) => {
    if (toAdd.includes(value)) {
      setToAdd((flags) => flags.filter((f) => f !== value));
      return;
    }

    if (toDelete.includes(value)) {
      alert("Permissions is already being deleted");
      return;
    }

    setToDelete((flags) => [...flags, value]);
  };

  const handleRestore = (value: PermissionFlag) => {
    setToDelete((flags) => flags.filter((f) => f !== value));
  };

  useEffect(() => {
    setToDelete([]);
    setToAdd([]);
  }, [user.permissions]);

  return (
    <div className="grid h-full w-full grid-cols-1 grid-rows-[1fr_auto] gap-8">
      <div className="h-full w-full">
        <div className="flex w-full flex-wrap items-start justify-start gap-2">
          {merged.map((flag, idx) => (
            <div
              key={idx}
              className={clsx(
                "flex h-fit w-fit items-center justify-center gap-2 rounded-md border border-gray-400 bg-gray-100 px-2 py-0.5 font-semibold text-gray-700",
                isBeingDeleted(flag) && "opacity-60",
                isBeingAdded(flag) && "border-blue-700 bg-blue-100 text-blue-700",
              )}
            >
              <span>{flag}</span>

              {isBeingDeleted(flag) && (
                <button onClick={() => handleRestore(flag)}>
                  <ArrowUturnLeftIcon className="h-5 w-5" />
                </button>
              )}

              {!isBeingDeleted(flag) && (
                <button onClick={() => handleDelete(flag)}>
                  <XMarkIcon className="h-5 w-5" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {missingFlags.map((flag, idx) => (
          <button
            key={idx}
            onClick={() => handleAdd(flag)}
            className="flex h-fit w-fit items-center justify-center gap-2 rounded-md border border-gray-400 bg-gray-100 px-2 py-0.5 font-semibold text-gray-700"
          >
            <span>{flag}</span>
            <PlusIcon className="h-5 w-5" />
          </button>
        ))}

        <button onClick={save} className="button mt-2 w-full self-end">
          Save
        </button>
      </div>
    </div>
  );
}

export async function action({ request }: ActionArgs) {
  const editor = await getAuthorizedUser(request, async (user) =>
    validateUserPermissions(user, permissions("EDIT_USER"), ValidationMode.SOFT),
  );

  const formData = await request.formData();

  const userId = formData.get("user.id");
  if (typeof userId !== "string") {
    throw new Response("user.id is not a string :/", { status: 401 });
  }
  const toAdd = UserPermissions.parse(formData.getAll("permissions.add"));
  const toDelete = UserPermissions.parse(formData.getAll("permissions.delete"));

  await prisma.$transaction([
    prisma.permissions.deleteMany({
      where: {
        userId,
        value: {
          in: toDelete,
        },
      },
    }),
    prisma.permissions.createMany({
      skipDuplicates: true,
      data: toAdd.map((flag) => ({
        userId: userId,
        providerId: editor.id,
        value: flag,
      })),
    }),
  ]);

  return null;
}

import type { ContextType } from "../$slug";
import type { ActionArgs, SerializeFrom } from "@remix-run/node";

import { ArrowUturnLeftIcon, CheckIcon, PlusIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { UserRole } from "@prisma/client";
import { json } from "@remix-run/node";
import { useFetcher, useOutletContext } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";

import { editUserRolesById } from "~/models/user.server";
import { UserRolesTitles } from "~/schemas/user.server";
import { userHasAnyRole } from "~/utils/permissions";
import { text } from "~/utils/responses.server";
import { ensureAuthorizedUser } from "~/utils/session.server";

export const handle: RouteHandle = {
  id: "yashiro.user.roles",
  withScrollRestoration: true,
};

export const action = async ({ request }: ActionArgs) => {
  await ensureAuthorizedUser(request, async (user) => userHasAnyRole(user, "ADMIN"));

  const formData = await request.formData();

  const userId = formData.get("user.id");
  if (typeof userId !== "string") {
    throw text("user.id is not a string");
  }

  const toAdd = UserRolesTitles.parse(formData.getAll("role.add"));
  const toDelete = UserRolesTitles.parse(formData.getAll("role.delete"));

  await editUserRolesById(userId, { toAdd, toDelete });

  return json({ success: true, date: new Date() });
};

type Action = SerializeFrom<typeof action>;

export default function YashiroUsersSlugRolesRoute() {
  const fetcher = useFetcher<Action>();

  const { user } = useOutletContext<ContextType>();

  const newRoleRef = useRef<HTMLInputElement>(null);

  const currentRoles = user.roles.map((r) => r.title);

  const [isAdding, setIsAdding] = useState(false);
  const [toAdd, setToAdd] = useState<Array<UserRole>>([]);
  const [toDelete, setToDelete] = useState<Array<UserRole>>([]);

  const mergedRoles = [...currentRoles, ...toAdd];

  const isRoleBeingAdded = (role: string) => toAdd.includes(role as UserRole);
  const isRoleBeingDeleted = (role: string) => toDelete.includes(role as UserRole);

  const handleStartAddingRole = () => {
    setIsAdding(true);
  };

  const handleStopAddingRole = () => {
    setIsAdding(false);
  };

  const handleAddNewRole = () => {
    if (!newRoleRef.current) {
      return;
    }

    const value = newRoleRef.current.value.toUpperCase();

    if (!Object.values(UserRole).includes(value as UserRole)) {
      alert(`${value} is invalid role`);
      return;
    }

    const newRole = value as UserRole;
    if (mergedRoles.includes(newRole)) {
      alert(`User already has ${newRole}`);
      return;
    }

    setToAdd((roles) => [...new Set([...roles, newRole])]);
    newRoleRef.current.value = "";
  };

  const handleRemoveRole = (role: string) => {
    if (toAdd.includes(role as UserRole)) {
      setToAdd((roles) => roles.filter((r) => r !== role));
      return;
    }

    if (role === UserRole.DEFAULT) {
      alert("you cant delete default role");
      return;
    }

    setToDelete((roles) => [...new Set([...roles, role as UserRole])]);
  };

  const handleRestoreRole = (role: string) => {
    if (toDelete.includes(role as UserRole)) {
      setToDelete((roles) => roles.filter((r) => r !== role));
    }
  };

  const submitRoles = () => {
    const formData = new FormData();
    formData.set("user.id", user.id);

    toDelete.forEach((role) => {
      formData.append("role.delete", role);
    });

    toAdd.forEach((role) => {
      formData.append("role.add", role);
    });

    fetcher.submit(formData, {
      method: "patch",
      encType: "multipart/form-data",
    });
  };

  useEffect(() => {
    if (fetcher.data?.success === true) {
      setToAdd([]);
      setToDelete([]);
    }
  }, [fetcher.data]);

  return (
    <div className="mt-8 flex h-fit flex-row flex-wrap gap-2 lg:mt-0">
      {mergedRoles.map((role, idx) => (
        <div
          key={idx}
          className={
            "flex h-6 flex-row items-center justify-center gap-1 rounded-md border border-gray-400 bg-gray-200 pl-2 font-semibold " +
            (isRoleBeingAdded(role) ? "!bg-gray-50 " : " ") +
            (isRoleBeingDeleted(role) ? "opacity-50" : "")
          }
        >
          <span>{role}</span>

          {isRoleBeingDeleted(role) && (
            <button onClick={() => handleRestoreRole(role)} className="px-2">
              <ArrowUturnLeftIcon className="h-5 w-5" />
            </button>
          )}

          {!isRoleBeingDeleted(role) && (
            <button onClick={() => handleRemoveRole(role)} className="px-2">
              <XMarkIcon className="h-5 w-5" />
            </button>
          )}
        </div>
      ))}

      {!isAdding && (
        <button
          onClick={handleStartAddingRole}
          className="button px-2 py-0.5 text-sm font-semibold"
        >
          <PlusIcon className="h-5 w-5" />
        </button>
      )}

      {isAdding && (
        <div className="flex flex-row items-center justify-center gap-1">
          <input ref={newRoleRef} className="input-field h-6 w-32 px-2 py-0.5 text-sm" />
          <button
            onClick={handleAddNewRole}
            className="flex h-5 w-5 items-center justify-center rounded-full bg-black text-white"
          >
            <CheckIcon className="h-4 w-4" />
          </button>
          <button
            onClick={handleStopAddingRole}
            className="flex h-5 w-5 items-center justify-center rounded-full bg-black text-white"
          >
            <XMarkIcon className="h-4 w-4" />
          </button>
        </div>
      )}

      {(toAdd.length > 0 || toDelete.length > 0) && !isAdding && (
        <button onClick={submitRoles} className="button px-2 py-0.5 text-sm font-semibold">
          submit
        </button>
      )}
    </div>
  );
}

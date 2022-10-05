import type { UserRole } from "@prisma/client";
import type { FC } from "react";

interface RoleBadgeProps {
  role: UserRole;
}

export const RoleBadge: FC<RoleBadgeProps> = ({ role }) => {
  if (role === "DEFAULT") {
    return null;
  }

  const bgColor = () => {
    if (role === "ADMIN") return "bg-red-500";
    else if (role === "MODERATOR") return "bg-green-700";
    else if (role === "WRITER") return "bg-sky-600";
    else return "bg-gray-700 dark:bg-neutral-700";
  };

  return (
    <span className={`rounded-md px-2 py-0.5 text-xs font-semibold text-white ${bgColor()}`}>
      {role}
    </span>
  );
};

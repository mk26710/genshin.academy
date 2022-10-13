import type { User } from "#/prisma/lib/client";
import type { FunctionComponent } from "react";

import { useNavigate } from "@remix-run/react";

import { UserAvatar } from "~/components/UserAvatar";

type UserCardProps = {
  id: User["id"];
  name: User["name"];
  avatarUrl?: User["avatarUrl"];
  isLink?: boolean;
  to?: string;
  className?: string;
};

export const UserCard: FunctionComponent<UserCardProps> = (props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (typeof props.to === "string" && props.isLink === true) {
      navigate(props.to);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={
        "card flex flex-col gap-2 " +
        (typeof props.className === "string" ? props.className : "") +
        (props.isLink === true ? "hover:card-shadow cursor-pointer" : "")
      }
    >
      <UserAvatar avatarUrl={props.avatarUrl} className="h-32 w-32 self-center" />
      <h2 className="self-center text-lg font-semibold">{props.name}</h2>
    </div>
  );
};

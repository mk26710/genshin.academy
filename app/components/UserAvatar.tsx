import type { User } from "#/prisma/lib/client";

import { forwardRef } from "react";

type UserAvatarProps = {
  avatarUrl?: User["avatarUrl"];
  className?: string;
};

export const UserAvatar = forwardRef<HTMLImageElement, UserAvatarProps>((props, ref) => {
  const defaultAvatarUrl =
    "https://cdn.discordapp.com/attachments/1002129706591715379/1029777815287124018/default.webp";

  return (
    <img
      src={props.avatarUrl ?? defaultAvatarUrl}
      ref={ref}
      className={`rounded-full object-cover ${props.className}`}
    />
  );
});

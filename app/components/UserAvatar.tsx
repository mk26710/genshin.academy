import type { User } from "#/prisma/lib/client";

import { forwardRef } from "react";

type UserAvatarProps = {
  avatarUrl?: User["avatarUrl"];
  className?: string;
};

export const UserAvatar = forwardRef<HTMLImageElement, UserAvatarProps>((props, ref) => {
  const defaultAvatarUrl =
    "https://cdn.discordapp.com/attachments/1002129706591715379/1029777815287124018/default.webp";

  // if props.avatarUrl is nullish set to default avatar
  // otherwise checks if props.avatarUrl is less or equeal
  // to 1 character then sets to default othewise to props.avatarUrl
  const realAvatarUrl =
    props.avatarUrl == null
      ? defaultAvatarUrl
      : props.avatarUrl.length <= 1
      ? defaultAvatarUrl
      : props.avatarUrl;

  return (
    <img
      src={realAvatarUrl}
      ref={ref}
      decoding="async"
      loading="lazy"
      className={`rounded-full object-cover ${props.className}`}
    />
  );
});

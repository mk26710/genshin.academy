import type { UserFlairs } from "@prisma/client";
import type { FunctionComponent } from "react";

import { orUndefined } from "~/utils/helpers";

type UserFlairProps = {
  text?: UserFlairs["text"];
  bgColor?: UserFlairs["bgColor"];
  fgColor?: UserFlairs["fgColor"];
};

export const UserFlair: FunctionComponent<UserFlairProps> = ({ text, bgColor, fgColor }) => {
  if (!text) return null;

  return (
    <span
      style={{ backgroundColor: orUndefined(bgColor), color: orUndefined(fgColor) ?? "#fff" }}
      className="rounded-md px-2 py-0.5 text-xs font-semibold uppercase text-white"
    >
      {text}
    </span>
  );
};

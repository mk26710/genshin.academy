import type { ComponentPropsWithRef, FC } from "react";

import clsx from "clsx";

type InputProps = ComponentPropsWithRef<"input">;

export const Input: FC<InputProps> = ({ className, ...props }) => {
  const cls = clsx("input", className);

  return <input {...props} className={cls} />;
};

import type { ComponentPropsWithRef } from "react";

import clsx from "clsx";
import { forwardRef } from "react";

interface Props extends ComponentPropsWithRef<"input"> {
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ fullWidth, className, type = "text", ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={clsx("input", fullWidth && "w-full", className)}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";

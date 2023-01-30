import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithRef } from "react";

import { cva } from "class-variance-authority";
import { forwardRef } from "react";

type InputVariantProps = VariantProps<typeof inputCva>;

const inputCva = cva("input", {
  variants: {
    width: {
      auto: "w-auto",
      full: "w-full",
    },
  },
});

type InputProps = ComponentPropsWithRef<"input"> & InputVariantProps;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ width, className, type = "text", ...props }, ref) => {
    const cls = inputCva({ width, className });

    return <input ref={ref} type={type} className={cls} {...props} />;
  },
);

Input.displayName = "Input";

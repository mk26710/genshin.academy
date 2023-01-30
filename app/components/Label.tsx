import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithRef, FC } from "react";

import { cva } from "class-variance-authority";

type LabelVariantProps = VariantProps<typeof labelCva>;

const labelCva = cva(null, {
  variants: {
    display: {
      block: "block",
    },
    text: {
      sm: "text-sm",
    },
    font: {
      medium: "font-medium",
    },
    textColor: {
      "gray-700": "text-gray-700",
    },
  },
  defaultVariants: {
    display: "block",
    text: "sm",
    font: "medium",
    textColor: "gray-700",
  },
});

type LabelProps = ComponentPropsWithRef<"label"> & LabelVariantProps;

export const Label: FC<LabelProps> = ({
  display,
  text,
  font,
  textColor,
  className,
  children,
  ...props
}) => {
  const cls = labelCva({
    display,
    text,
    font,
    textColor,
    className,
  });

  return (
    <label className={cls} {...props}>
      {children}
    </label>
  );
};

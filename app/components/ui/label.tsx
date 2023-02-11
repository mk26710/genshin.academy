import type { ComponentPropsWithRef, FC, PropsWithChildren } from "react";

import clsx from "clsx";

type LabelProps = PropsWithChildren<ComponentPropsWithRef<"label">>;

export const Label: FC<LabelProps> = ({ className, children, ...props }) => {
  return (
    <label {...props} className={clsx("label", className)}>
      {children}
    </label>
  );
};

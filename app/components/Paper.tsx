import type { ElementType } from "react";
import type { PolymorphicProps } from "~/types/react";

import clsx from "clsx";

type PaperProps = {
  className?: string;
};

export const Paper = <Component extends ElementType = "div">({
  as,
  children,
  className,
  ...rest
}: PolymorphicProps<PaperProps, Component>) => {
  const Component = as ?? "div";

  return (
    <Component className={clsx("paper", className)} {...rest}>
      {children}
    </Component>
  );
};

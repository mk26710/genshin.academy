import type { ComponentPropsWithoutRef, ElementType, PropsWithChildren } from "react";

import clsx from "clsx";

type AsProp<C extends ElementType> = {
  as?: C;
};

type PolymorphicPropsWithoutRef<
  C extends ElementType,
  P = Record<string, unknown>,
> = PropsWithChildren<P> & AsProp<C> & ComponentPropsWithoutRef<C>;

type PaperProps<C extends ElementType> = PolymorphicPropsWithoutRef<
  C,
  {
    className?: string;
  }
>;

export const Paper = <As extends ElementType = "div">({
  as,
  children,
  className,
  ...rest
}: PaperProps<As>) => {
  const Component = as ?? "div";

  return (
    <Component
      className={clsx(
        "grid break-inside-avoid grid-flow-row auto-rows-min grid-cols-1 rounded-lg border p-4 shadow-sm transition-all duration-100 ease-in hover:scale-[1.01] hover:shadow-lg dark:border-neutral-700 dark:bg-neutral-800 dark:hover:brightness-125",
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  );
};

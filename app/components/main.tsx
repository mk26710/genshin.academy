import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithRef, FC, HTMLAttributes } from "react";

import { cva } from "class-variance-authority";
import { clsx } from "clsx";

// Root <main>
type MainRootProps = ComponentPropsWithRef<"main">;

const MainRoot: FC<MainRootProps> = ({ className, children, ...props }) => {
  return (
    <main className={clsx("main", className)} {...props}>
      {children}
    </main>
  );
};

// The inner container <div> which places content in center

type ContainerVariantProps = VariantProps<typeof containerCva>;

const containerCva = cva(null, {
  variants: {
    display: {
      flex: "flex",
    },
    maxW: {
      screenXl: "max-w-screen-xl",
      content: "max-w-content",
    },
    w: {
      auto: "w-auto",
      full: "w-full",
      fit: "w-fit",
    },
    minH: {
      availableScreen: "min-h-screen-available",
      full: "min-h-full",
    },
    h: {
      availableScreen: "h-screen-available",
      auto: "h-auto",
      full: "h-full",
      fit: "h-fit",
      max: "h-max",
    },
    flex: {
      1: "flex-1",
      auto: "flex-auto",
      initial: "flex-initial",
      none: "flex-none",
    },
    direction: {
      row: "flex-row",
      rowReverse: "flex-row-reverse",
      col: "flex-col",
      colReverse: "flex-col-reverse",
    },
    mx: {
      auto: "mx-auto",
    },
  },
  defaultVariants: {
    display: "flex",
    direction: "col",
    flex: 1,
    maxW: "content",
    w: "full",
    minH: "full",
    h: "auto",
    mx: "auto",
  },
});

type ContainerProps = HTMLAttributes<HTMLDivElement> & ContainerVariantProps;

const MainContainer: FC<ContainerProps> = ({
  display,
  maxW,
  w,
  minH,
  h,
  flex,
  direction,
  mx,
  className,
  children,
  ...props
}) => {
  const cls = containerCva({ display, maxW, w, minH, h, flex, direction, mx, className });

  return (
    <div data-main-container={true} className={cls} {...props}>
      {children}
    </div>
  );
};

export const Main = Object.assign(MainRoot, { Container: MainContainer });

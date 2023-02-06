import type { VariantProps } from "class-variance-authority";
import type { FC, HTMLAttributes } from "react";

import { cva } from "class-variance-authority";

// Root <main>

type MainRootVariantProps = VariantProps<typeof rootCva>;

const rootCva = cva(null, {
  variants: {
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
    maxW: {
      screen: "max-w-[100vw]",
      full: "max-w-full",
      fit: "max-w-fit",
      max: "max-w-max",
      min: "max-w-min",
    },
    w: {
      screen: "max-w-[100vw]",
      full: "w-full",
      auto: "w-auto",
    },
    display: {
      flex: "flex",
      block: "block",
    },
    direction: {
      row: "flex-row",
      col: "flex-col",
    },
    wrap: {
      wrap: "flex-wrap",
      reverse: "flex-wrap-reverse",
      nowrap: "flex-nowrap",
    },
    p: {
      0.5: "px-0.5 py-0.5",
      1: "px-1 py-1",
      2: "px-2 py-2",
      3: "px-3 py-3",
      4: "px-4 py-4",
      5: "px-5 py-5",
      6: "px-6 py-6",
    },
  },
  defaultVariants: {
    minH: "availableScreen",
    h: "full",
    maxW: "screen",
    w: "full",
    display: "flex",
    direction: "col",
    wrap: "wrap",
    p: 4,
  },
});

type MainRootProps = HTMLAttributes<HTMLDivElement> & MainRootVariantProps;

const MainRoot: FC<MainRootProps> = ({
  minH,
  h,
  maxW,
  w,
  display,
  direction,
  wrap,
  p,
  className,
  children,
  ...props
}) => {
  const cls = rootCva({
    minH,
    h,
    maxW,
    w,
    display,
    direction,
    wrap,
    p,
    className,
  });

  return (
    <main className={cls} {...props}>
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

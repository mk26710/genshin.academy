import type { VariantProps } from "cva";
import type { ButtonHTMLAttributes, ElementType, ReactNode } from "react";
import type { PolymorphicProps } from "~/types/react";

import { cva } from "cva";

// look at components.css for the base style definition

const buttonCva = cva("button-base", {
  variants: {
    color: {
      red: "button-red-base",
      blue: "button-blue-base",
      green: "button-green-base ",
      semiblack: "button-semiblack-base",
      primary: "button-primary-base",
    },
    variant: {
      filled: "",
      light: "",
      outline: "bg-transparent border border-1",
    },
    radius: {
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
      full: "rounded-full",
    },
    size: {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl",
    },
  },
  compoundVariants: [
    {
      variant: "filled",
      className: "border-none text-white",
    },
    {
      variant: "light",
      className: "border-none",
    },
    {
      variant: "outline",
      className: "!bg-transparent",
    },
    {
      variant: "outline",
      color: "red",
      className: "text-red-500",
    },
    {
      variant: "outline",
      color: "blue",
      className: "text-blue-500",
    },
    {
      variant: "outline",
      color: "green",
      className: "text-green-500",
    },
    {
      variant: "outline",
      color: "primary",
      className: "text-primary-500",
    },
    {
      variant: "light",
      color: "red",
      className: [
        "bg-red-100",
        "text-red-600",
        "hover:bg-red-200",
        "dark:bg-red-600/30",
        "dark:text-red-300",
        "dark:hover:bg-red-600/40",
      ],
    },
    {
      variant: "light",
      color: "blue",
      className: [
        "bg-blue-50",
        "text-blue-600",
        "hover:bg-blue-100",
        "dark:bg-blue-600/30",
        "dark:text-blue-300",
        "dark:hover:bg-blue-600/40",
      ],
    },
    {
      variant: "light",
      color: "green",
      className: [
        "bg-green-50",
        "text-green-600",
        "hover:bg-green-100",
        "dark:bg-green-600/30",
        "dark:text-green-300",
        "dark:hover:bg-green-600/40",
      ],
    },
    {
      variant: "light",
      color: "primary",
      className: [
        "bg-primary-50",
        "text-primary-600",
        "hover:bg-primary-100",
        "dark:bg-primary-600/30",
        "dark:text-primary-300",
        "dark:hover:bg-primary-600/40",
      ],
    },
    {
      variant: "light",
      color: "semiblack",
      className: [
        "bg-gray-200",
        "text-gray-700",
        "hover:bg-gray-300",
        "dark:bg-primary-600/30",
        "dark:text-primary-300",
        "dark:hover:bg-primary-600/40",
      ],
    },
  ],
  defaultVariants: {
    color: "primary",
    radius: "md",
    size: "sm",
    variant: "filled",
  },
});

interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    VariantProps<typeof buttonCva> {
  children: ReactNode;
}

export const Button = <Component extends ElementType = "button">({
  children,
  variant,
  color,
  radius,
  size,
  role = "button",
  className,
  as,
  ...rest
}: PolymorphicProps<ButtonProps, Component>) => {
  const Component = as ?? "button";

  return (
    <Component
      role={role}
      className={buttonCva({ className, color, variant, radius, size })}
      {...rest}
    >
      {children}
    </Component>
  );
};

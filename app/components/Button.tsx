import type { VariantProps } from "cva";
import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cva } from "cva";

const buttonCva = cva(
  "border font-semibold px-4 h-9 flex flex-row justify-center items-center active:translate-y-[1px]",
  {
    variants: {
      color: {
        red: "bg-red-500 border-red-500 hover:bg-red-600 hover:border-red-600",
        blue: "bg-blue-500 border-blue-500 hover:bg-blue-600 hover:border-blue-600",
        green: "bg-green-600 border-green-600 hover:bg-green-700 hover:border-green-700",
        black: "bg-black border-black",
        primary: "bg-primary-500 border-primary-500 hover:bg-primary-600 hover:border-primary-600",
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
    ],
    defaultVariants: {
      color: "primary",
      radius: "md",
      size: "sm",
      variant: "filled",
    },
  },
);

interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    VariantProps<typeof buttonCva> {
  children: ReactNode;
}

export const Button = ({
  children,
  variant,
  color,
  radius,
  size,
  className,
  ...rest
}: ButtonProps) => {
  return (
    <button className={buttonCva({ className, color, variant, radius, size })} {...rest}>
      {children}
    </button>
  );
};

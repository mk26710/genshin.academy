import { forwardRef } from "react";

type InputProps = JSX.IntrinsicElements["input"];

interface Props extends InputProps {
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ fullWidth, className = "", type = "text", ...props }, ref) => {
    const fullWidthClass = fullWidth === true ? "w-full" : "";

    return (
      <input
        ref={ref}
        type={type}
        className={`form-input h-10 rounded-lg border border-neutral-200 bg-white text-[#000] placeholder:text-neutral-400 focus:ring-2 focus:ring-primary-500 dark:border-dark-800 dark:bg-dark-900 dark:text-dark-300 dark:placeholder:text-dark-500 ${fullWidthClass} ${className}`}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";

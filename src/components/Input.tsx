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
        className={`h-10 form-input text-[#000] dark:text-dark-300 rounded-lg border border-neutral-200 dark:border-dark-800 bg-white dark:bg-dark-900 placeholder:text-neutral-400 dark:placeholder:text-dark-500 shadow-lg focus:ring-2 focus:ring-primary-500 ${fullWidthClass} ${className}`}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";

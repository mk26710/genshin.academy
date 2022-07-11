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
        className={`h-10 py-1.5 pl-2 pr-3 text-[#000] dark:text-dark-300 rounded-lg border border-neutral-200 dark:border-dark-800 bg-white dark:bg-dark-900 focus:outline-2 focus:accent-primary-500 placeholder:text-neutral-400 dark:placeholder:text-dark-500 ${fullWidthClass} ${className}`}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";

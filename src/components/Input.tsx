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
        className={`form-input h-10 rounded-lg border border-gray-200 bg-white text-sm text-[#000] shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-primary-500 ${fullWidthClass} ${className}`}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";

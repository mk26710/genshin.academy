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
        className={`input-field ${fullWidthClass} ${className}`}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";

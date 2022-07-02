import { forwardRef } from "react";

type InputProps = JSX.IntrinsicElements[`input`];

interface Props extends InputProps {
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ fullWidth, className = ``, type = `text`, ...props }, ref) => {
    const fullWidthClass = fullWidth === true ? `w-full` : ``;

    return (
      <input
        ref={ref}
        type={type}
        className={`mb-4 leading-6 dark:text-dark-300 placeholder:text-neutral-400 dark:placeholder:text-dark-400 accent-primary-500 rounded-lg border border-neutral-200 dark:border-dark-200/10 dark:bg-dark-800 bg-whiteshadow-sm py-1.5 pl-2 pr-3 ${fullWidthClass} ${className}`}
        {...props}
      />
    );
  },
);

Input.displayName = `Input`;

import type { HTMLProps } from "react";

import clsx from "clsx";
import { useId, forwardRef } from "react";

type Props = Omit<HTMLProps<HTMLInputElement>, "type"> & {
  label?: string;
  labelClassName?: string;
};

type Ref = HTMLInputElement;

export const Checkbox = forwardRef<Ref, Props>(
  ({ className, label, labelClassName, ...props }, ref) => {
    const generatedId = useId();
    const id = props.id ?? generatedId;

    if (label) {
      return (
        <span className="flex flex-row flex-wrap items-center gap-1">
          <input
            ref={ref}
            id={id}
            type="checkbox"
            className={clsx("checkbox peer", className)}
            {...props}
          />
          <label htmlFor={id} className={clsx("select-none text-base", labelClassName)}>
            {label}
          </label>
        </span>
      );
    }

    return (
      <input ref={ref} id={id} type="checkbox" className={clsx("checkbox", className)} {...props} />
    );
  },
);

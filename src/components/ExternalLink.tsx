import type { FunctionComponent } from "react";

export const ExternalLink: FunctionComponent<JSX.IntrinsicElements["a"]> = ({
  target = "_blank",
  rel = "noreferrer",
  className = "",
  children,
  ...props
}) => {
  return (
    <a
      target={target}
      rel={rel}
      className={`hover:text-primary-500 transition-colors ease-in-out duration-200 ${className}`}
      {...props}
    >
      {children}
    </a>
  );
};

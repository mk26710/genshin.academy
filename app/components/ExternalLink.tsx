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
      className={`transition-colors duration-200 ease-in-out hover:text-primary-500 ${className}`}
      {...props}
    >
      {children}
    </a>
  );
};

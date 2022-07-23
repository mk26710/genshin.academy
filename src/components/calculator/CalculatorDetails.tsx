import type { FC, ReactNode } from "react";

interface Props {
  className?: string;
  children: ReactNode;
}

export const CalculatorDetails: FC<Props> = ({ className = "", children }) => {
  return <p className={`mb-4 mt-2 text-sm ${className}`}>{children}</p>;
};

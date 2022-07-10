import type { FC, ReactNode } from "react";

interface Props {
  className?: string;
  children: ReactNode;
}

export const CalculatorRoot: FC<Props> = ({ className = "", children }) => {
  return <div className={`calculator ${className}`}>{children}</div>;
};

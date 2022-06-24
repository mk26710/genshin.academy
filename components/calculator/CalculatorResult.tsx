import { FC, ReactNode } from "react";

interface Props {
  className?: string;
  children: ReactNode;
}

export const CalculatorResult: FC<Props> = ({ className = "", children }) => {
  return <div className={`mt-4 ${className}`}>{children}</div>;
};

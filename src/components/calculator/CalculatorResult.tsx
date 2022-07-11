import type { FC, ReactNode } from "react";

interface Props {
  className?: string;
  children: ReactNode;
}

export const CalculatorResult: FC<Props> = ({ className = "", children }) => {
  return <div className={`mt-4 dark:text-dark-300 ${className}`}>{children}</div>;
};

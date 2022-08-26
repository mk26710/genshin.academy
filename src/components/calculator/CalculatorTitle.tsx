import type { FC, ReactNode } from "react";

interface Props {
  className?: string;
  children: ReactNode;
}

export const CalculatorTitle: FC<Props> = ({ className = "", children }) => {
  return (
    <h1 className={`flex flex-row text-3xl font-semibold capitalize ${className}`}>{children}</h1>
  );
};

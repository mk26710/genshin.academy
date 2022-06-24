import { FC, ReactNode } from "react";

interface Props {
  className?: string;
  children: ReactNode;
}

export const CalculatorTitle: FC<Props> = ({ className = "", children }) => {
  return <h1 className={`calculator-title ${className}`}>{children}</h1>;
};

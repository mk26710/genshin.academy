import { FC, ReactNode } from "react";

interface Props {
  className?: string;
  children: ReactNode;
}

export const CalculatorDetails: FC<Props> = ({ className = "", children }) => {
  return <p className="calculator-details">{children}</p>;
};

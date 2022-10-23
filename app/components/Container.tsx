import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  withScrollRestoration?: boolean;
  verticalCenter?: boolean;
}

export const Container = ({ className = "", children }: Props) => {
  return <main className={`main ${className}`}>{children}</main>;
};

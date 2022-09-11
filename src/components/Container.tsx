import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  verticalCenter?: boolean;
}

export const Container = ({ verticalCenter = false, className = "", children }: Props) => {
  const verticalClass = verticalCenter ? "place-content-center" : "";

  return (
    <main className={`main my-4 grid ${verticalClass} ${className}`}>
      <div id="content">{children}</div>
    </main>
  );
};

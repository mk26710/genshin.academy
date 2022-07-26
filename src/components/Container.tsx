import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  verticalCenter?: boolean;
}

export const Container = ({ verticalCenter = false, children }: Props) => {
  const verticalClass = verticalCenter ? "place-content-center" : "";

  return (
    <main className={`main grid p-4 ${verticalClass}`}>
      <div id="content">{children}</div>
    </main>
  );
};

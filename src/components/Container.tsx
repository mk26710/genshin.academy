import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  verticalCenter?: boolean;
}

export const Container = ({ verticalCenter = false, children }: Props) => {
  const verticalClass = verticalCenter ? `place-content-center` : ``;

  return (
    <main className={`main p-4 grid ${verticalClass}`}>
      <div id="content">{children}</div>
    </main>
  );
};

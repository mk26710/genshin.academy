import type { FC } from "react";

interface Props {
  title?: string;
  headings: Array<string>;
}

export const ContentsTable: FC<Props> = ({ title, headings }) => {
  return (
    <div className="hidden lg:flex flex-col min-h-screen max-h-screen">
      <div className="sticky top-4 overflow-y-auto ml-4 w-64 card">
        <div className="flex flex-col gap-y-2 p-4 w-full">
          {title && (
            <h1 className="pb-2 font-semibold border-b border-neutral-200 dark:border-dark-200/10 text-[#000] dark:text-dark-300">
              {title}
            </h1>
          )}

          {headings.map((heading) => (
            <a key={`guide-nav-${heading}`} href={`#${heading}`} className="capitalize">
              {heading.replace("-", " ")}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

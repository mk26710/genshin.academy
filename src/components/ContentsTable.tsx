import type { FC } from "react";

interface Props {
  title?: string;
  headings: Array<string>;
}

export const ContentsTable: FC<Props> = ({ title, headings }) => {
  return (
    <div className="hidden max-h-screen min-h-screen flex-col lg:flex">
      <div className="card sticky top-4 ml-4 w-64 overflow-y-auto">
        <div className="flex w-full flex-col gap-y-2 p-4">
          {title && (
            <h1 className="border-b border-neutral-200 pb-2 font-semibold text-[#000] dark:border-dark-200/10 dark:text-dark-300">
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

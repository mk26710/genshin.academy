import type { FC } from "react";

interface Props {
  title?: string;
  headings: Array<string>;
}

export const ContentsTable: FC<Props> = ({ title, headings }) => {
  return (
    <div className="hidden flex-col space-y-1 lg:flex">
      <div className="sticky right-0 top-4 w-64 overflow-y-auto rounded-lg border border-neutral-200 bg-white text-[#000] dark:border-dark-800 dark:bg-dark-900 dark:text-dark-300">
        <div className="flex w-full flex-col gap-y-2 p-4">
          <div className="mb-0 self-center border-b border-neutral-200 pb-3 dark:border-dark-800">
            <h1 className="font-semibold">{title}</h1>
          </div>

          <div className="flex flex-col gap-y-0">
            {headings.map((heading) => (
              <a
                key={`guide-nav-${heading}`}
                href={`#${heading}`}
                className="block rounded-lg px-4 py-2 text-sm font-medium capitalize text-neutral-700 hover:bg-neutral-100 dark:text-dark-300 dark:hover:bg-dark-800"
              >
                {heading.replaceAll("-", " ")}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

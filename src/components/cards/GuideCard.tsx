import type { FC } from "react";

import { ChevronDoubleRightIcon } from "@heroicons/react/20/solid";
import NextLink from "next/link";
import { useId } from "react";

interface Props {
  id: string;
  title: string;
  description: string;
  publishedAtUnix: number;
  thumbnail: string;
  href: string;
  author: string;
  className?: string;
}

export const GuideCard: FC<Props> = ({
  id,
  title,
  description,
  publishedAtUnix,
  thumbnail,
  href = "#",
  author,
  className = "",
}) => {
  const htmlId = useId();

  return (
    <>
      <NextLink href={href} prefetch={false}>
        <a
          id={id}
          className={`card group flex flex-col gap-4 p-0 transition-all duration-200 ease-in-out hover:shadow-lg ${className}`}
        >
          {thumbnail && (
            <img
              src={thumbnail}
              className="rounded-t-lg text-transparent"
              alt="character icon"
              height="1920px"
              width="1080px"
            />
          )}

          <div id={htmlId + "-body"} className="flex flex-grow flex-col gap-2 px-6 ">
            <h4 className="text-xl font-semibold">{title}</h4>

            <div className="text-justify text-sm">
              <p lang="en" className="hyphens-auto">
                {description}
              </p>
            </div>
          </div>

          <div id={htmlId + "-footer"} className="mt-2 grid grid-cols-1 gap-4 px-6 pb-6 ">
            <div className="place-self-end">
              <NextLink href={href}>
                <a
                  role="button"
                  className="flex flex-row items-center justify-center gap-2 rounded bg-primary-100 py-2 pl-4 pr-3 text-sm font-medium text-primary-700 transition-all duration-150 ease-in-out group-hover:bg-primary-200"
                >
                  <span>Read</span>
                  <ChevronDoubleRightIcon className="h-5 w-5" />
                </a>
              </NextLink>
            </div>
          </div>
        </a>
      </NextLink>
    </>
  );
};

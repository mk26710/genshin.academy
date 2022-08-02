import type { FC } from "react";

import dayjs from "dayjs";
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
          className={`mt-4 flex flex-col gap-4 rounded-lg bg-white p-6 drop-shadow-lg dark:bg-dark-900 ${className}`}
        >
          {thumbnail && (
            <div id={htmlId + "-header"}>
              <img
                src={thumbnail}
                className="-mt-12 rounded-lg text-transparent drop-shadow-lg"
                alt="character icon"
                height="1920px"
                width="1080px"
              />
            </div>
          )}

          <div id={htmlId + "-body"} className="flex flex-grow flex-col gap-2">
            <h4 className="text-xl font-semibold dark:text-dark-200">{title}</h4>

            <div className="text-justify text-sm">
              <p>{description}</p>
            </div>
          </div>

          <div id={htmlId + "-footer"} className="mt-2 flex flex-row gap-4">
            <img
              className="h-10 w-10 rounded-full text-transparent drop-shadow-lg"
              src={`https://github.com/${author}.png?size=128`}
              alt="author avatar"
            />

            <div className="flex-1 self-center text-sm opacity-75 dark:text-dark-200">
              <p>by {author}</p>
              <p>{dayjs.unix(publishedAtUnix).format("YYYY-MM-DD")}</p>
            </div>
          </div>
        </a>
      </NextLink>
    </>
  );
};

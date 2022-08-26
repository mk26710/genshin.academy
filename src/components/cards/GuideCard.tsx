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
          className={`card flex flex-col gap-4 p-0 transition-all duration-200 ease-in-out hover:-translate-y-1 hover:shadow-lg ${className}`}
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

          <div id={htmlId + "-footer"} className="mt-2 flex flex-row gap-4 px-6 pb-6 ">
            <img
              className="h-10 w-10 rounded-full text-transparent drop-shadow-lg"
              src={`https://github.com/${author}.png?size=128`}
              alt="author avatar"
            />

            <div className="flex-1 self-center text-sm opacity-75">
              <p>by {author}</p>
              <p>{dayjs.unix(publishedAtUnix).format("YYYY-MM-DD")}</p>
            </div>
          </div>
        </a>
      </NextLink>
    </>
  );
};

import type { FC } from "react";

import dayjs from "dayjs";
import { useEffect, useState } from "react";

import { StaticPicture } from "@/components/StaticPicture";

import LocaleLink from "../LocaleLink";

interface Props {
  id: string;
  title: string;
  description?: string;
  publishedAt?: Date;
  thumbnail?: string;
  href?: string;
  className?: string;
}

export const GuideCard: FC<Props> = ({
  id,
  title,
  description,
  publishedAt,
  thumbnail,
  href = "#",
  className = "",
}) => {
  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <LocaleLink href={href} prefetch={false}>
      <a id={id} className={`card card-vertical ${className}`}>
        {thumbnail && (
          <StaticPicture
            src={thumbnail}
            className="object-fill object-top rounded-t-lg w-full min-h-[10rem] lg:min-h-[20rem] aspect-[9/16]"
            alt="character icon"
          />
        )}

        <div className="p-4">
          {publishedAt && (
            <div className="font-medium text-sm text-primary-500">
              {isMounted && <>{dayjs(publishedAt).format("lll")}</>}
            </div>
          )}

          <p className="mb-2 block font-bold text-[#000] dark:text-dark-300 text-lg">{title}</p>

          {description && <p className="text-sm text-justify">{description}</p>}
        </div>
      </a>
    </LocaleLink>
  );
};

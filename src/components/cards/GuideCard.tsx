import type { FC } from "react";

import dayjs from "dayjs";
import NextLink from "next/link";
import { useEffect, useState } from "react";

import { StaticPicture } from "@/components/StaticPicture";

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
  href = `#`,
  className = ``,
}) => {
  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <NextLink href={href} prefetch={false}>
      <a id={id} className={`card card-vertical ${className}`}>
        {thumbnail && (
          <StaticPicture
            src={thumbnail}
            className="card-thumbnail min-h-[10rem] lg:min-h-[20rem] aspect-[9/16]"
            alt="character icon"
          />
        )}

        <div className="card-text-container">
          {publishedAt && (
            <div className="card-text-container-item font-medium text-sm leading-6 text-primary-500">
              {isMounted && <>{dayjs(publishedAt).format(`lll`)}</>}
            </div>
          )}

          <p className="card-text-container-item block font-semibold text-base leading-6">
            {title}
          </p>

          {description && (
            <p className="card-text-container-item text-sm text-justify leading-6">{description}</p>
          )}
        </div>
      </a>
    </NextLink>
  );
};

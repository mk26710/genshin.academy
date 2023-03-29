import type { FC } from "react";
import type { Nil } from "~/types/common";

import { clsx } from "clsx";
import { Link } from "@remix-run/react";
import { useTranslations } from "use-intl";
import { LazyImage } from "~/components/lazy-image";

type PostCardProps = {
  slug: string;
  thumbnailUrl?: Nil<string>;
  title: string;
  description?: Nil<string>;
  className?: string;
};

export const PostCard: FC<PostCardProps> = ({
  slug,
  title,
  description,
  thumbnailUrl,
  className,
}) => {
  const t = useTranslations();

  return (
    <Link
      to={`/posts/${slug}`}
      className={clsx(
        "daisy-card break-inside-avoid overflow-y-hidden bg-base-200 shadow-xl",
        className,
      )}
    >
      <figure className="aspect-video px-10 pt-10">
        <LazyImage src={thumbnailUrl ?? ""} className="aspect-video rounded-box object-cover" />
      </figure>

      <div className="daisy-card-body items-center text-center">
        <h2 className="daisy-card-title">{title}</h2>
        <p>{description}</p>
        <div className="daisy-card-actions mt-2">
          <button className="daisy-btn-primary daisy-btn">{t("common.read")}</button>
        </div>
      </div>
    </Link>
  );
};

import type { Post } from "@prisma/client";
import type { FunctionComponent } from "react";

import { Link } from "@remix-run/react";
import { useTranslations } from "use-intl";

import { Paper } from "~/components/Paper";

type PostCardProps = Pick<Post, "slug" | "thumbnailUrl" | "title" | "description" | "publishedAt">;

export const PostCard: FunctionComponent<PostCardProps> = ({
  slug,
  thumbnailUrl,
  title,
  description,
}) => {
  const t = useTranslations();

  return (
    <Paper
      as={Link}
      to={`/posts/${slug}`}
      className="relative flex break-inside-avoid flex-col overflow-hidden p-0"
    >
      {thumbnailUrl && (
        <img
          src={thumbnailUrl}
          loading="lazy"
          decoding="async"
          className="z-0 aspect-video w-full rounded-t-md object-cover"
        />
      )}
      <h3 className="mt-2 px-4 text-xl font-semibold dark:text-white">{title}</h3>
      <p className="mb-2 px-4 text-sm hyphens-auto">{description}</p>
      <button className="button mx-4 mb-4 border-none bg-blue-500 hover:bg-blue-600 dark:bg-blue-600/30 dark:text-blue-200 dark:hover:bg-blue-600/40">
        {t("common.read")}
      </button>
    </Paper>
  );
};

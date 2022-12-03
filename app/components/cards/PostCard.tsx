import type { Post } from "@prisma/client";
import type { FunctionComponent } from "react";

import { Link } from "@remix-run/react";
import { useTranslations } from "use-intl";

import { Button } from "~/components/Button";
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
      <Button variant="light" color="primary" className="mx-4 mb-4">
        {t("common.read")}
      </Button>
    </Paper>
  );
};

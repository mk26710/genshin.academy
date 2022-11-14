import type { Post } from "@prisma/client";
import type { FunctionComponent } from "react";

import { Link } from "@remix-run/react";

import { Paper } from "~/components/Paper";
import { useAfterHydration } from "~/hooks/use-hydrated";
import { useVisitorLocale } from "~/hooks/use-visitor-locale";

type PostCardProps = Pick<Post, "slug" | "thumbnailUrl" | "title" | "description" | "publishedAt">;

export const PostCard: FunctionComponent<PostCardProps> = ({
  slug,
  thumbnailUrl,
  title,
  description,
  publishedAt,
}) => {
  const locale = useVisitorLocale();
  const publishDate = useAfterHydration(new Date(publishedAt));

  return (
    <Paper
      as={Link}
      to={`/posts/${slug}`}
      className="relative flex break-inside-avoid flex-col overflow-hidden before:absolute before:top-0 before:left-0 before:z-[-1] before:h-full before:w-full before:transition-all before:duration-100 hover:scale-[1.01] hover:shadow-lg hover:before:bg-inherit hover:before:brightness-125"
    >
      {thumbnailUrl && (
        <img
          src={thumbnailUrl}
          loading="lazy"
          decoding="async"
          className="z-0 aspect-video w-full rounded-md object-cover"
        />
      )}
      <h3 className="mt-2 text-xl font-semibold dark:text-white">{title}</h3>
      <p className="mb-2 text-sm hyphens-auto">{description}</p>
      <p className="self-end text-sm italic opacity-70">
        {publishDate?.toLocaleDateString(locale)}
      </p>
    </Paper>
  );
};

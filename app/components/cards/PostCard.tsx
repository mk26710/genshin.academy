import type { Post } from "#prisma/client";
import type { FunctionComponent } from "react";

import { Link } from "@remix-run/react";

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

  return (
    <Link
      to={`/posts/${slug}`}
      className="card hover:card-shadow flex break-inside-avoid flex-col overflow-hidden rounded-md border p-0"
    >
      {thumbnailUrl && (
        <img
          src={thumbnailUrl}
          loading="lazy"
          decoding="async"
          className="aspect-video w-full object-cover"
        />
      )}
      <h3 className="mt-2 px-[var(--default-gap)] text-xl font-semibold">{title}</h3>
      <p className="px-[var(--default-gap)] text-sm hyphens-auto">{description}</p>
      <p className="mb-[var(--default-gap)] self-end px-[var(--default-gap)] text-sm italic opacity-70">
        {new Date(publishedAt).toLocaleDateString(locale)}
      </p>
    </Link>
  );
};

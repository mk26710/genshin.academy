import type { PostType } from "@prisma/client";

import { prisma } from "@/server/db/client";

export const getPostBySlug = async (slug: string) => {
  return await prisma.post.findFirst({ where: { slug }, include: { content: true } });
};

export const getPostBySlugWithAuthor = async (slug: string) => {
  return await prisma.post.findFirst({
    where: { slug },
    include: {
      content: true,
      author: {
        select: {
          id: true,
          name: true,
          image: true,
          role: true,
        },
      },
    },
  });
};

export const getPostBySlugWithAuthorJsonSafe = async (slug: string) => {
  const _post = await getPostBySlugWithAuthor(slug);
  if (_post == null) {
    return null;
  }

  // JSON can't have Date objects so conversion is needed
  const { publishedAt, editedAt, ...post } = _post;
  const safePost = {
    ...post,
    publishedAt: publishedAt.toISOString(),
    editedAt: editedAt?.toISOString() ?? null,
  };

  return safePost;
};

interface SearchPostsPaginatedOptions {
  skip: number;
  take: number;
  authorName?: string;
  searchTitle?: string;
  lang?: string[];
  type?: PostType;
  order?: "asc" | "desc";
}

export const countSearchPostsPaginated = async (
  options: Exclude<SearchPostsPaginatedOptions, "skip" | "take">,
) => {
  return await prisma.post.count({
    where: {
      type: options.type,
      lang: {
        in: options.lang,
      },
      author: {
        name: options.authorName,
      },
      title: {
        search: options.searchTitle,
        mode: "insensitive",
      },
    },
  });
};

export const searchPostsPaginated = async ({
  skip,
  take,
  order = "desc",
  ...options
}: SearchPostsPaginatedOptions) => {
  return await prisma.post.findMany({
    skip,
    take,
    where: {
      type: options.type,
      lang: {
        in: options.lang,
      },
      author: {
        name: options.authorName,
      },
      title: {
        search: options.searchTitle,
        mode: "insensitive",
      },
    },
    orderBy: {
      publishedAt: order,
    },
    select: {
      id: true,
      slug: true,
      title: true,
      type: true,
      lang: true,
      description: true,
      thumbnailUrl: true,
      status: true,
      author: {
        select: {
          id: true,
          name: true,
          role: true,
        },
      },
    },
  });
};

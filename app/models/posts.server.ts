import type { Post, PostContent, PostType } from "@prisma/client";

import { prisma } from "~/db/prisma.server";

export const getPostBySlug = async (slug: string) =>
  await prisma.post.findFirst({ where: { slug }, include: { content: true } });

export const getPostBySlugWithAuthor = async (slug: string) =>
  await prisma.post.findFirst({
    where: { slug },
    include: {
      content: true,
      author: {
        select: {
          id: true,
          name: true,
          avatarUrl: true,
          roles: true,
        },
      },
    },
  });

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
) =>
  await prisma.post.count({
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

export const searchPostsPaginated = async ({
  skip,
  take,
  order = "desc",
  ...options
}: SearchPostsPaginatedOptions) =>
  await prisma.post.findMany({
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
      description: true,
      thumbnailUrl: true,
      status: true,
      lang: true,
      author: {
        select: {
          id: true,
          name: true,
          roles: true,
        },
      },
    },
  });

type CreatePostOptions = {
  slug: Post["slug"];
  type: Post["type"];
  lang: Post["lang"];
  title: Post["title"];
  description: Post["description"];
  tags: Post["tags"];
  thumbnailUrl: Post["thumbnailUrl"];
  authorId: Post["authorId"];
  contentRaw: PostContent["raw"];
};

export const createPost = async (opts: CreatePostOptions) =>
  await prisma.post.create({
    data: {
      slug: opts.slug,
      lang: opts.lang,
      title: opts.title,
      description: opts.description,
      tags: opts.tags,
      type: opts.type,
      thumbnailUrl: opts.thumbnailUrl,
      authorId: opts.authorId,
      content: {
        create: {
          raw: opts.contentRaw,
        },
      },
    },
  });

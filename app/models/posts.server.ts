import type { Post, PostContent, PostType } from "@prisma/client";

import { db } from "~/db/prisma.server";

export const getPostBySlug = async (slug: string) =>
  await db.post.findUnique({ where: { slug }, include: { content: true } });

export const getPostBySlugWithAuthor = async (slug: string) =>
  await db.post.findUnique({
    where: { slug },
    include: {
      content: true,
      author: {
        select: {
          id: true,
          name: true,
          avatarUrl: true,
          roles: true,
          flair: true,
        },
      },
    },
  });

type GetLatestPostOptions = Pick<Post, "lang">;

export const getLatestPost = async (opts?: GetLatestPostOptions) =>
  await db.post.findFirst({
    orderBy: {
      publishedAt: "desc",
    },
    where: {
      lang: opts?.lang,
    },
    select: {
      slug: true,
      title: true,
      description: true,
      thumbnailUrl: true,
      lang: true,
      publishedAt: true,
      author: {
        select: {
          id: true,
          name: true,
          avatarUrl: true,
          flair: true,
        },
      },
    },
  });

interface SearchPostsPaginatedOptions {
  skip: number;
  take: number;
  authorName?: string;
  searchTitle?: string;
  lang?: string;
  type?: PostType;
  order?: "asc" | "desc";
}

export const countSearchPostsPaginated = async (
  options: Exclude<SearchPostsPaginatedOptions, "skip" | "take">,
) =>
  await db.post.count({
    where: {
      type: options.type,
      lang: options.lang,
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
  await db.post.findMany({
    skip,
    take,
    where: {
      type: options.type,
      lang: options.lang,
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
      publishedAt: true,
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
  await db.post.create({
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

type UpdatePostOptions = Omit<CreatePostOptions, "slug" | "authorId"> & {
  editorId: Post["editorId"];
};

export const updatePostBySlug = async (slug: string, opts: UpdatePostOptions) =>
  await db.post.update({
    where: {
      slug,
    },
    data: {
      lang: opts.lang,
      title: opts.title,
      description: opts.description,
      tags: opts.tags,
      type: opts.type,
      thumbnailUrl: opts.thumbnailUrl,
      editorId: opts.editorId,
      editedAt: new Date(),
      content: {
        upsert: {
          create: {
            raw: opts.contentRaw,
          },
          update: {
            raw: opts.contentRaw,
          },
        },
      },
    },
  });

export const deletePostBySlug = async (slug: string) =>
  await db.post.delete({ where: { slug } });

export const deletePostById = async (id: string) => await db.post.delete({ where: { id } });

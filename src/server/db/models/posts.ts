import type { Post, PostType, User } from "@prisma/client";

import { prisma } from "@/server/db/client";
import { userHasAnyRole } from "@/utils/permissions";

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

type PostLikeObject = Record<string, unknown> & Pick<Post, "authorId">;
type UserLikeObject = Record<string, unknown> & {
  id: User["id"];
  role: User["role"];
};

export const canUserEditPost = (user: Nil<UserLikeObject>, post: Nil<PostLikeObject>) => {
  if (user == null || post == null) {
    return false;
  }

  if (user.id === post.authorId || userHasAnyRole(user, "ADMIN", "MODERATOR")) {
    return true;
  }

  return false;
};

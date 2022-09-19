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

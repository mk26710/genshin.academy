import type { Post, User } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import type { ZodIssue } from "zod";

import { getServerAuthSession } from "@/server/common/get-server-auth-session";
import { minimumRoleWriter } from "@/server/common/permissions";
import { prisma } from "@/server/db/client";
import { getPostBySlugWithAuthor } from "@/server/db/models/posts";
import { PostsNewOrEditForm } from "@/server/schemas/posts";
import { userHasAnyRole } from "@/utils/permissions";

type PostLikeObject = Record<string, unknown> & Pick<Post, "authorId">;
type UserLikeObject = Record<string, unknown> & {
  id: User["id"];
  role: User["role"];
};

const canEdit = (user: Nil<UserLikeObject>, post: Nil<PostLikeObject>) => {
  if (user == null || post == null) {
    return false;
  }

  if (user.id === post.authorId || userHasAnyRole(user, "ADMIN", "MODERATOR")) {
    return true;
  }

  return false;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerAuthSession({ req, res });
  if (!session) {
    res
      .status(401)
      .json({ success: false, error: { message: "Unauthorized" } } as ZenlessJsonResponse);
    return;
  }

  if (!minimumRoleWriter(session.user?.role)) {
    res
      .status(401)
      .json({ success: false, error: { message: "Unauthorized" } } as ZenlessJsonResponse);
    return;
  }

  const parsedBody = PostsNewOrEditForm.safeParse(req.body);
  if (parsedBody.success !== true) {
    res.status(400).json({
      success: false,
      error: { message: "Form validation failed", data: parsedBody.error.issues },
    } as ZenlessJsonResponse<unknown, ZodIssue[]>);
    return;
  }

  const post = await getPostBySlugWithAuthor(parsedBody.data.slug);
  if (!canEdit(session.user, post)) {
    res
      .status(401)
      .json({ success: false, error: { message: "Unauthorized" } } as ZenlessJsonResponse);
    return;
  }

  await prisma.post.update({
    where: {
      slug: parsedBody.data.slug,
    },
    data: {
      title: parsedBody.data.title,
      description: parsedBody.data.description,
      type: parsedBody.data.type,
      lang: parsedBody.data.lang,
      thumbnailUrl: parsedBody.data.thumbnail,
      tags: parsedBody.data.tags,
      editedAt: new Date(),
      editorId: session.user?.id,
      content: {
        update: {
          raw: parsedBody.data.text,
        },
      },
    },
  });

  res.status(200).json({ success: true } as ZenlessJsonResponse);
}

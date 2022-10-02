import type { Post } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import type { Session } from "next-auth";

import { getServerAuthSession } from "@/server/common/get-server-auth-session";
import { prisma } from "@/server/db/client";
import { userHasAnyRole } from "@/utils/permissions";

const canDelete = (user?: Session["user"], post?: Post) => {
  if (user == null || post == null) {
    return false;
  }

  if (userHasAnyRole(user, "MODERATOR", "ADMIN")) {
    return true;
  }

  if (user.id === post.authorId) {
    return true;
  }

  return false;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerAuthSession({ req, res });
  if (!session) {
    res.status(401).send("Unauthorized");
    return;
  }

  const slug = req.query.slug;
  if (typeof slug !== "string") {
    res.status(400).send("Bad Request");
    return;
  }

  const post = await prisma.post.findFirst({ where: { slug } });
  if (!post) {
    res.status(404).send("Post not found");
    return;
  }

  if (!canDelete(session.user, post)) {
    res.status(403).send("You are not allowed to delete this post");
    return;
  }

  await prisma.post.delete({ where: { slug } });
  res.status(200).send("OK");
}

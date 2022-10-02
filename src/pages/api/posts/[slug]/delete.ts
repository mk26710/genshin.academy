import type { NextApiRequest, NextApiResponse } from "next";

import { getServerAuthSession } from "@/server/common/get-server-auth-session";
import { prisma } from "@/server/db/client";
import { canUserDeletePost } from "@/utils/permissions";

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

  if (!canUserDeletePost(session.user, post)) {
    res.status(403).send("You are not allowed to delete this post");
    return;
  }

  await prisma.post.delete({ where: { slug } });
  res.status(200).send("OK");
}

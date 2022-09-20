import type { NextApiRequest, NextApiResponse } from "next";

import { Prisma } from "@prisma/client";

import { getServerAuthSession } from "@/server/common/get-server-auth-session";
import { minimumRoleWriter } from "@/server/common/permissions";
import { prisma } from "@/server/db/client";
import { PostsNewOrEditForm } from "@/server/schemas/posts";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerAuthSession({ req, res });
  if (!session) {
    res.status(401).json({ error: { message: "Unauthorized" } });
    return;
  }

  if (!minimumRoleWriter(session.user?.role)) {
    res.status(403).json({ error: { message: "Forbidden" } });
    return;
  }

  const parsedBody = PostsNewOrEditForm.safeParse(req.body);
  if (parsedBody.success !== true) {
    res.status(400).json(parsedBody);
    return;
  }

  try {
    const insert = await prisma.post.create({
      data: {
        authorId: session.user?.id,
        title: parsedBody.data.title,
        slug: parsedBody.data.slug,
        description: parsedBody.data.description,
        thumbnailUrl: parsedBody.data.thumbnail,
        lang: parsedBody.data.lang,
        type: parsedBody.data.type,
        tags: parsedBody.data.tags,
        content: {
          create: {
            raw: parsedBody.data.text,
          },
        },
      },
    });

    res.status(302).redirect(`/posts/${insert.slug}`);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        res.status(500).json({
          success: false,
          error: {
            issues: [
              {
                message: "This slug is already taken.",
                path: ["slug"],
              },
            ],
          },
        });
      }
    }
  }
}

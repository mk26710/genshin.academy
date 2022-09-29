import type { NextApiRequest, NextApiResponse } from "next";
import type { ZodIssue } from "zod";

import { searchPostsPaginated } from "@/server/db/models/posts";
import { PostsSearch } from "@/server/schemas/posts";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const parsedBody = PostsSearch.safeParse(req.body);
  if (parsedBody.success !== true) {
    res.status(400).json({
      success: false,
      error: { message: "Failed to parse body", data: parsedBody.error.issues },
    } as ZenlessJsonResponse<unknown, ZodIssue[]>);
    return;
  }

  const { query, lang, order, skip, take, type, authorName } = parsedBody.data;
  const posts = await searchPostsPaginated({
    skip,
    take,
    authorName,
    order,
    lang,
    type,
    searchTitle: query,
  });

  res
    .status(200)
    .json({ success: true, data: posts } as ZenlessJsonResponse<
      Awaited<ReturnType<typeof searchPostsPaginated>>
    >);
};

export default handler;

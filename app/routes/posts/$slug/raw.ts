import type { LoaderArgs } from "@remix-run/node";

import { Response } from "@remix-run/node";

import { getPostBySlugWithAuthor } from "~/models/posts.server";
import { userHasAnyRole } from "~/utils/permissions";
import { text } from "~/utils/responses.server";
import { ensureAuthorizedUser } from "~/utils/session.server";

export const loader = async ({ request, params }: LoaderArgs) => {
  await ensureAuthorizedUser(request, async (user) =>
    userHasAnyRole(user, "ADMIN", "DEVELOPER", "MODERATOR", "WRITER"),
  );

  const slug = params?.slug;
  if (typeof slug !== "string") {
    throw text("Post slug is not a string somehow", { status: 500 });
  }

  const post = await getPostBySlugWithAuthor(slug);
  if (!post) {
    throw text("Post not found", { status: 404 });
  }

  return new Response(`${post.content?.raw}`);
};

import type { LoaderArgs } from "@remix-run/node";

import { Response } from "@remix-run/node";

import { getPostBySlugWithAuthor } from "~/models/posts.server";
import { permissions, validateUserPermissions, ValidationMode } from "~/utils/permissions";
import { notFound, serverError } from "~/utils/responses.server";
import { authorizeUser } from "~/utils/session.server";

export const loader = async ({ request, params }: LoaderArgs) => {
  const slug = params?.slug;
  if (typeof slug !== "string") {
    throw serverError({ message: "Post slug is not a string somehow" });
  }

  const post = await getPostBySlugWithAuthor(slug);
  if (!post) {
    throw notFound({ message: "Post not found" });
  }

  await authorizeUser(request, async (user) =>
    validateUserPermissions(
      user,
      permissions("NEW_POST", "EDIT_MY_POST", "EDIT_SOMEONES_POST"),
      ValidationMode.SOFT,
    ),
  );

  return new Response(`${post.content?.raw}`);
};

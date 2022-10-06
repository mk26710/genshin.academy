import type { LoaderArgs, MetaFunction, SerializeFrom } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Container } from "~/components/Container";
import { getPostBySlugWithAuthor } from "~/models/posts.server";
import { canUserEditPost } from "~/utils/permissions";
import { text } from "~/utils/responses.server";
import { ensureAuthorizedUser } from "~/utils/session.server";

type LoaderData = SerializeFrom<typeof loader>;

export const loader = async ({ request, params }: LoaderArgs) => {
  const slug = params?.slug;
  if (typeof slug !== "string") {
    throw text("Post slug is not a string somehow", { status: 500 });
  }

  const post = await getPostBySlugWithAuthor(slug);
  if (!post) {
    throw text("Post not found", { status: 404 });
  }

  await ensureAuthorizedUser(request, async (user) => canUserEditPost(user, post));

  return json({ post });
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data?.post) {
    return {
      title: "Post not found",
    };
  }

  return {
    title: data.post.title,
    description: data.post.description,
  };
};

const PostsSlugEditRoute = () => {
  const {} = useLoaderData() as LoaderData;

  return <Container>1</Container>;
};

export default PostsSlugEditRoute;

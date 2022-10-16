import type { ActionArgs, LoaderArgs, MetaFunction, SerializeFrom } from "@remix-run/node";

import { PostType } from "@prisma/client";
import { redirect, json } from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";

import { Container } from "~/components/Container";
import { UserAvatar } from "~/components/UserAvatar";
import { useUser } from "~/hooks/use-user";
import { getPostBySlugWithAuthor, updatePostBySlug } from "~/models/posts.server";
import { PostsNewOrEditForm } from "~/schemas/posts";
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

type ActionData = SerializeFrom<typeof action>;

export const action = async ({ request, params }: ActionArgs) => {
  const slug = params?.slug;
  if (typeof slug !== "string") {
    throw text("Post slug is not a string somehow", { status: 500 });
  }

  const post = await getPostBySlugWithAuthor(slug);
  if (!post) {
    throw text("Post not found", { status: 404 });
  }

  const editorUser = await ensureAuthorizedUser(request, async (user) =>
    canUserEditPost(user, post),
  );

  const formData = await request.formData();
  const parsedForm = await PostsNewOrEditForm.safeParseAsync({
    ...Object.fromEntries(formData),
    slug,
  });

  if (parsedForm.success !== true) {
    return json({ error: parsedForm.error }, { status: 400 });
  }

  const { lang, title, description, type, thumbnail, tags, text: contentRaw } = parsedForm.data;
  await updatePostBySlug(slug, {
    lang,
    title,
    description,
    type,
    tags,
    contentRaw,
    editorId: editorUser.id,
    thumbnailUrl: thumbnail,
  });

  return redirect(`/posts/${slug}`);
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
  const user = useUser();

  const { post } = useLoaderData() as LoaderData;
  const actionData = useActionData() as ActionData;

  const issueOf = (path: string) => {
    return actionData?.error?.issues?.find((issue) => issue.path.includes(path));
  };

  return (
    <Container>
      <div className="mb-8 flex flex-row gap-x-2">
        <UserAvatar avatarUrl={user.avatarUrl} className="h-16 w-16" />
        <div className="self-center">{user.name}</div>
      </div>

      <Form method="post" className="flex flex-col gap-2">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>

          <input
            type="text"
            id="title"
            name="title"
            defaultValue={post.title}
            className="input-field w-full"
            required
          />

          {issueOf("title") && <div className="pt-1 text-red-700">{issueOf("title")?.message}</div>}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>

          <textarea
            id="description"
            name="description"
            defaultValue={post.description ?? undefined}
            className="textarea-field min-h-[2.5rem] w-full"
            required
          />

          {issueOf("description") && (
            <div className="pt-1 text-red-700">{issueOf("description")?.message}</div>
          )}
        </div>

        <div>
          <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
            Slug
          </label>

          <input
            type="text"
            id="slug"
            name="slug"
            className="input-field w-full"
            defaultValue={post.slug}
            readOnly
          />

          {issueOf("slug") && <div className="pt-1 text-red-700">{issueOf("slug")?.message}</div>}
        </div>

        <div>
          <label htmlFor="lang" className="block text-sm font-medium text-gray-700">
            Language (en, ru, etc.)
          </label>

          <select
            id="lang"
            name="lang"
            defaultValue={post.lang}
            className="select-field w-full font-normal"
            required
          >
            <option value="en">English</option>
            <option value="ru">Русский</option>
          </select>

          {issueOf("lang") && <div className="pt-1 text-red-700">{issueOf("lang")?.message}</div>}
        </div>

        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700">
            Type (CHARACTER_GUIDE, GENERAL_GUIDE, GENERAL)
          </label>

          <select
            id="type"
            name="type"
            defaultValue={post.type}
            className="select-field w-full font-normal"
          >
            {Object.entries(PostType).map(([pt]) => (
              <option key={pt} value={pt}>
                {pt}
              </option>
            ))}
          </select>

          {issueOf("type") && <div className="pt-1 text-red-700">{issueOf("type")?.message}</div>}
        </div>

        <div>
          <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700">
            Thumbnail url
          </label>

          <input
            id="thumbnail"
            name="thumbnail"
            defaultValue={post.thumbnailUrl ?? undefined}
            className="input-field w-full"
            required
          />
          {issueOf("thumbnail") && (
            <div className="pt-1 text-red-700">{issueOf("thumbnail")?.message}</div>
          )}
        </div>

        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
            Tags
          </label>

          <input
            id="tags"
            name="tags"
            defaultValue={post.tags}
            className="input-field w-full"
            required
          />
          {issueOf("tags") && <div className="pt-1 text-red-700">{issueOf("tags")?.message}</div>}
        </div>

        <div>
          <label htmlFor="text" className="block text-sm font-medium text-gray-700">
            Text of the post
          </label>

          <textarea
            id="text"
            name="text"
            defaultValue={post.content?.raw}
            className="textarea-field h-[30rem] min-h-[2.5rem] w-full resize-y"
            required
          />
          {issueOf("text") && <div className="pt-1 text-red-700">{issueOf("text")?.message}</div>}
        </div>

        <button type="submit" className="button">
          Submit
        </button>
      </Form>
    </Container>
  );
};

export default PostsSlugEditRoute;

import type { UserRole } from "@prisma/client";
import { PostType } from "@prisma/client";
import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { Container } from "~/components/Container";
import { useUser } from "~/hooks/use-user";
import { createPost } from "~/models/posts.server";
import { PostsNewOrEditForm } from "~/schemas/posts";
import type { ensureAuthenticatedUser } from "~/utils/session.server";
import { ensureAuthorizedUser } from "~/utils/session.server";

const allowedRoles: UserRole[] = ["OWNER", "ADMIN", "WRITER"];

const accessLevelPredicate = async (user: Awaited<ReturnType<typeof ensureAuthenticatedUser>>) =>
  user.roles.some((role) => allowedRoles.includes(role.title));

export const loader = async ({ request }: LoaderArgs) => {
  await ensureAuthorizedUser(request, accessLevelPredicate);
  return null;
};

export const action = async ({ request }: ActionArgs) => {
  const user = await ensureAuthorizedUser(request, accessLevelPredicate);

  const formData = await request.formData();
  const parsedForm = await PostsNewOrEditForm.safeParseAsync(Object.fromEntries(formData));

  if (parsedForm.success !== true) {
    return json({ error: parsedForm.error }, { status: 400 });
  }

  const {
    slug,
    type,
    lang,
    title,
    description,
    tags,
    thumbnail: thumbnailUrl,
    text: contentRaw,
  } = parsedForm.data;

  const createdPost = await createPost({
    authorId: user.id,
    slug,
    type,
    lang,
    title,
    description,
    tags,
    thumbnailUrl,
    contentRaw,
  });

  return redirect(`/posts/${createdPost.slug}`);
};

const PostsNewRoute = () => {
  const user = useUser();
  const actionData = useActionData<typeof action>();

  const issueOf = (path: string) => {
    return actionData?.error?.issues?.find((issue) => issue.path.includes(path));
  };

  return (
    <Container>
      <div className="mb-8 flex flex-row gap-x-2">
        <img
          src={user.avatarUrl ?? undefined}
          alt="User avatar"
          className="h-16 w-16 rounded-full"
        />
        <div className="self-center">{user.name}</div>
      </div>

      <Form method="post" className="flex flex-col gap-2">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>

          <input type="text" id="title" name="title" className="input-field w-full" required />

          {issueOf("title") && <div className="pt-1 text-red-700">{issueOf("title")?.message}</div>}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>

          <textarea
            id="description"
            name="description"
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

          <input type="text" id="slug" name="slug" className="input-field w-full" required />

          {issueOf("slug") && <div className="pt-1 text-red-700">{issueOf("slug")?.message}</div>}
        </div>

        <div>
          <label htmlFor="lang" className="block text-sm font-medium text-gray-700">
            Language (en, ru, etc.)
          </label>

          <select id="lang" name="lang" className="select-field w-full font-normal" required>
            <option value="en">English</option>
            <option value="ru">Русский</option>
          </select>

          {issueOf("lang") && <div className="pt-1 text-red-700">{issueOf("lang")?.message}</div>}
        </div>

        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700">
            Type (CHARACTER_GUIDE, GENERAL_GUIDE, GENERAL)
          </label>

          <select id="type" name="type" className="select-field w-full font-normal">
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

          <input id="thumbnail" name="thumbnail" className="input-field w-full" required />
          {issueOf("thumbnail") && (
            <div className="pt-1 text-red-700">{issueOf("thumbnail")?.message}</div>
          )}
        </div>

        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
            Tags
          </label>

          <input id="tags" name="tags" className="input-field w-full" required />
          {issueOf("tags") && <div className="pt-1 text-red-700">{issueOf("tags")?.message}</div>}
        </div>

        <div>
          <label htmlFor="text" className="block text-sm font-medium text-gray-700">
            Text of the post
          </label>

          <textarea
            id="text"
            name="text"
            className="textarea-field min-h-[2.5rem] w-full resize-y"
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

export default PostsNewRoute;

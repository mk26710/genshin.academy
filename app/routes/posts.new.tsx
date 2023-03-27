import type { HeadersFunction, LoaderArgs, MetaFunction } from "@remix-run/node";

import { PostType } from "@prisma/client";
import { json } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { useId } from "react";
import { redirect } from "react-router";

import { Main } from "~/components/main";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { db } from "~/db/prisma.server";
import { NewPostSchema } from "~/schemas/forms/new-post.server";
import { generateTitle } from "~/utils/meta-generator";
import { requireUserWithEveryFlag } from "~/utils/session.server";

export const headers: HeadersFunction = () => ({
  "X-Robots-Tag": "noindex",
});

export const meta: MetaFunction = () => ({
  robots: "noindex",
  title: generateTitle("New Post"),
});

export const loader = async ({ request }: LoaderArgs) => {
  await requireUserWithEveryFlag(request, ["NEW_POST"]);

  return null;
};

export default function NewPost() {
  const id = useId();

  const actionData = useActionData() as Action | undefined;

  return (
    <Main>
      <Main.Container>
        <Form method="post" className="daisy-card flex flex-col gap-2 bg-base-200 shadow">
          <div className="daisy-card-body">
            <h2 className="font-semibold">New Post</h2>
            <p className="mb-4 text-sm">
              This form will create a new post on the website, once created it will be publicly
              available!
            </p>

            <div className="daisy-form-control">
              <label htmlFor={`${id}:title`} className="daisy-label">
                <span className="daisy-label-text">Post Title</span>
              </label>
              <input
                name="title"
                id={`${id}:title`}
                placeholder="Some very clickbaity title..."
                className="daisy-input-bordered daisy-input"
                required
              />
              {actionData?.error?.title != null && (
                <p className="text-sm text-red-500">{actionData.error.title}</p>
              )}
            </div>

            <div className="daisy-form-control">
              <label htmlFor={`${id}:description`} className="daisy-label">
                <span className="daisy-label-text">Description</span>
              </label>
              <textarea
                name="description"
                id={`${id}:description`}
                placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit."
                className="daisy-textarea-bordered daisy-textarea"
              />
              {actionData?.error?.description != null && (
                <p className="text-sm text-red-500">{actionData.error.description}</p>
              )}
            </div>

            <div className="daisy-form-control">
              <label htmlFor={`${id}:lang`} className="daisy-label">
                <span className="daisy-label-text">Language</span>
              </label>
              <select
                name="lang"
                id={`${id}:lang`}
                className="daisy-select-bordered daisy-select"
                required
              >
                <option value="ru">Русский</option>
                <option value="en">English</option>
              </select>
              {actionData?.error?.lang != null && (
                <p className="text-sm text-red-500">{actionData.error.lang}</p>
              )}
            </div>

            <div className="daisy-form-control">
              <label htmlFor={`${id}:slug`} className="daisy-label">
                <span className="daisy-label-text">Slug</span>
              </label>
              <input
                name="slug"
                id={`${id}:slug`}
                placeholder="nice-url"
                required
                className="daisy-input-bordered daisy-input"
              />
              {actionData?.error?.slug != null && (
                <p className="text-sm text-red-500">{actionData.error.slug}</p>
              )}
            </div>

            <div className="daisy-form-control">
              <label htmlFor={`${id}:type`} className="daisy-label">
                <span className="daisy-label-text">Type</span>
              </label>
              <select
                name="type"
                id={`${id}:type`}
                className="daisy-select-bordered daisy-select"
                required
              >
                {Object.values(PostType).map((pt) => (
                  <option key={pt} value={pt}>
                    {pt}
                  </option>
                ))}
              </select>
              {actionData?.error?.type != null && (
                <p className="text-sm text-red-500">{actionData.error.type}</p>
              )}
            </div>

            <div className="daisy-form-control">
              <label htmlFor={`${id}:tags`} className="daisy-label">
                <span className="daisy-label-text">Tags</span>
              </label>
              <input
                name="tags"
                id={`${id}:tags`}
                placeholder="Tag1, tag2, tag3, ..."
                className="daisy-input-bordered daisy-input"
              />
              {actionData?.error?.tags != null && (
                <p className="text-sm text-red-500">{actionData.error.tags}</p>
              )}
            </div>

            <div className="daisy-form-control">
              <label htmlFor={`${id}:thumbnail`} className="daisy-label">
                <span className="daisy-label-text">Thumbnail URL</span>
              </label>
              <input
                name="thumbnail"
                id={`${id}:thumbnail`}
                placeholder="https://s3.genshin.academy/picture.png"
                className="daisy-input-bordered daisy-input"
              />
              {actionData?.error?.thumbnail != null && (
                <p className="text-sm text-red-500">{actionData.error.thumbnail}</p>
              )}
            </div>

            <div className="daisy-form-control">
              <label htmlFor={`${id}:text`} className="daisy-label">
                <span className="daisy-label-text">Content (Markdown)</span>
              </label>
              <textarea
                name="text"
                id={`${id}:text`}
                placeholder="**Lorem** _ipsum_ dolor *sit* amet `consectetur adipisicing` elit."
                className="daisy-textarea-bordered daisy-textarea"
                required
              />
              {actionData?.error?.text != null && (
                <p className="text-sm text-red-500">{actionData.error.text}</p>
              )}
            </div>

            <button type="submit" className="daisy-btn-primary daisy-btn mt-4">
              Create
            </button>
          </div>
        </Form>
      </Main.Container>
    </Main>
  );
}

type Action = {
  readonly success?: boolean;
  readonly error?: {
    readonly title?: string;
    readonly description?: string;
    readonly lang?: string;
    readonly slug?: string;
    readonly type?: string;
    readonly thumbnail?: string;
    readonly tags?: string;
    readonly text?: string;
  };
};

export const action = async ({ request }: LoaderArgs) => {
  const user = await requireUserWithEveryFlag(request, ["NEW_POST"]);

  const formData = await request.formData();
  const validation = await NewPostSchema.safeParseAsync(Object.fromEntries(formData));
  if (!validation.success) {
    const error = validation.error.format();

    return json<Action>({
      success: false,
      error: {
        title: error.title?._errors.join(", "),
        description: error.description?._errors.join(", "),
        lang: error.lang?._errors.join(", "),
        slug: error.slug?._errors.join(", "),
        type: error.type?._errors.join(", "),
        tags: error.tags?._errors.join(", "),
        thumbnail: error.thumbnail?._errors.join(", "),
        text: error.text?._errors.join(", "),
      },
    });
  }

  const createdPost = await db.$transaction(async (tx) => {
    const { title, description, lang, slug, thumbnail, type, tags, text } = validation.data;

    return await tx.post.create({
      data: {
        title,
        description,
        lang,
        slug,
        type,
        tags,
        thumbnailUrl: thumbnail,
        authorId: user.id,
        status: "PUBLISHED",
        content: {
          create: {
            raw: text,
          },
        },
      },
    });
  });

  return redirect(`/posts/${createdPost.slug}`);
};

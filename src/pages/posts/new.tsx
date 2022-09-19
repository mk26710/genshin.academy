import type { GetServerSideProps, NextPage } from "next";
import type { FormEventHandler } from "react";
import type { ZodIssue } from "zod";

import { PostType } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";

import { Container } from "@/components/Container";
import { Layout } from "@/components/Layout";
import { RoleBadge } from "@/components/RoleBadge";
import { useCurrentLocale } from "@/hooks/use-current-locale";
import { getServerAuthSession } from "@/server/common/get-server-auth-session";

const PostsNew: NextPage = () => {
  const { data: session } = useSession();

  const router = useRouter();
  const locale = useCurrentLocale();

  const formRef = useRef<HTMLFormElement>(null);

  const [issues, setIssues] = useState<ZodIssue[]>();
  const [redirect, setRedirect] = useState({ needed: false, destination: "/" });

  const issueOf = (path: string) => {
    return issues?.find((issue) => issue.path.includes(path));
  };

  const submitNewPost: FormEventHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData(formRef.current ?? undefined);
    const json = Object.fromEntries(formData.entries());

    const response = await fetch("/api/posts/new", {
      method: "POST",
      body: JSON.stringify(json),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.redirected) {
      const responseData = await response.json();
      if ("error" in responseData && "success" in responseData && responseData.success !== true) {
        setIssues(responseData.error.issues);
      } else {
        setIssues([]);
      }
    } else {
      setRedirect({ needed: true, destination: `/${locale}/posts/${json.slug}` });
    }
  };

  useEffect(() => {
    if (redirect.needed) {
      router.push(redirect.destination);
    }
  }, [redirect]);

  if (session == null) {
    return null;
  }

  if (session.user == null) {
    return null;
  }

  return (
    <Layout title="New Post">
      <Container>
        <div className="mb-8 flex flex-row gap-x-2">
          <img src={`${session.user.image}`} alt="User avatar" className="h-16 w-16 rounded-full" />
          <div className="self-center">
            <RoleBadge role={session.user.role} /> {session.user.name}
          </div>
        </div>

        {/* <div>error: {JSON.stringify(issues, null, 2)}</div> */}

        <form ref={formRef} className="flex flex-col gap-2" onSubmit={submitNewPost}>
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>

            <input type="text" id="title" name="title" className="input-field w-full" required />

            {issueOf("title") && (
              <div className="pt-1 text-red-700">{issueOf("title")?.message}</div>
            )}
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>

            <textarea
              id="description"
              name="description"
              className="input-field form-textarea min-h-[2.5rem] w-full"
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

            <select id="lang" name="lang" className="input-field form-select w-full" required>
              <option value="en">English</option>
              <option value="ru">Русский</option>
            </select>

            {issueOf("lang") && <div className="pt-1 text-red-700">{issueOf("lang")?.message}</div>}
          </div>

          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">
              Type (CHARACTER_GUIDE, GENERAL_GUIDE, GENERAL)
            </label>

            <select id="type" name="type" className="input-field form-select w-full">
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
              className="input-field form-input w-full"
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

            <input id="tags" name="tags" className="input-field form-input w-full" required />
            {issueOf("tags") && <div className="pt-1 text-red-700">{issueOf("tags")?.message}</div>}
          </div>

          <div>
            <label htmlFor="text" className="block text-sm font-medium text-gray-700">
              Text of the post
            </label>

            <textarea
              id="text"
              name="text"
              className="input-field form-textarea min-h-[2.5rem] w-full resize-y"
              required
            />
            {issueOf("text") && <div className="pt-1 text-red-700">{issueOf("text")?.message}</div>}
          </div>

          <button
            type="submit"
            className="rounded-md bg-primary-200 px-3 py-2 text-sm text-primary-700 duration-200 hover:bg-primary-300"
          >
            Submit
          </button>
        </form>
      </Container>
    </Layout>
  );
};

export default PostsNew;

export const getServerSideProps: GetServerSideProps = async ({ req, res, locale = "en" }) => {
  const session = await getServerAuthSession({ req, res });
  if (!session) {
    return {
      props: {},
      redirect: {
        destination: "/signin",
      },
    };
  }

  const messages = {
    common: (await import(`#/locales/${locale}/common.json`)).default,
    meta: (await import(`#/locales/${locale}/meta.json`)).default,
    footer: (await import(`#/locales/${locale}/footer.json`)).default,
  };

  return {
    props: {
      messages,
      session,
    },
  };
};

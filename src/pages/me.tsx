import type { GetStaticProps } from "next";

import { Square2StackIcon } from "@heroicons/react/20/solid";

import { Container } from "@/components/Container";
import { Layout } from "@/components/Layout";
import { LoadingSomething } from "@/components/LoadingSomething";
import { RoleBadge } from "@/components/RoleBadge";
import { useAuthenticatedSession } from "@/hooks/use-authenticated-session";
import { useCurrentLocale } from "@/hooks/use-current-locale";

const Me = () => {
  const locale = useCurrentLocale();
  const { data: session, status } = useAuthenticatedSession();

  const copyUserIdToClipboard = () => {
    if (navigator != null && session != null && session.user != null) {
      navigator.clipboard.writeText(session.user.id);
    }
  };

  if (status === "loading") {
    return (
      <Layout title="Profile">
        <LoadingSomething />
      </Layout>
    );
  }

  if (!session) {
    return null;
  }

  if (!session.user) {
    return null;
  }

  return (
    <Layout title="Profile">
      <Container className="grid place-items-center">
        <div className="card flex w-full flex-col gap-2 pt-2 lg:w-96">
          <input type="text" name="currentUserId" value={session.user.id} hidden readOnly />

          <div className="mb-4 grid w-fit grid-cols-[auto_auto_auto] grid-rows-1 text-sm dark:text-neutral-600">
            <p>ID:</p>
            <p className="ml-1 mr-4">{session.user.id}</p>
            <div className="relative">
              <button onClick={copyUserIdToClipboard} className="peer">
                <Square2StackIcon className="h-5 w-5 hover:opacity-60 active:opacity-40" />
              </button>
              <span className="absolute bottom-6 -left-7 ml-4 rounded bg-black px-2 py-1.5 text-xs font-medium text-white opacity-0 peer-hover:opacity-100 lg:bottom-8">
                Copy
              </span>
            </div>
          </div>

          {session.user.image && (
            <img
              src={session.user.image}
              width="128"
              height="128"
              alt={`${session.user.name}'s avatar`}
              className="self-center rounded-full"
            />
          )}

          <h1 className="self-center text-xl font-semibold">{session.user.name}</h1>
          <div className="mt-4 grid auto-rows-min grid-cols-[auto_1fr] gap-x-2">
            <h1 className="font-semibold">Role:</h1>
            <h2>
              <RoleBadge role={session.user.role} />
            </h2>

            <h1 className="font-semibold">Joined:</h1>
            <h2>{new Date(session.user.createdAt).toLocaleString(locale)}</h2>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default Me;

export const getStaticProps: GetStaticProps = async ({ locale = "en" }) => {
  const messages = {
    common: (await import(`#/locales/${locale}/common.json`)).default,
    meta: (await import(`#/locales/${locale}/meta.json`)).default,
    footer: (await import(`#/locales/${locale}/footer.json`)).default,
  };

  return {
    props: {
      messages,
    },
  };
};

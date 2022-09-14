import type { GetServerSideProps } from "next";

import { useSession } from "next-auth/react";
import { useEffect } from "react";

import { Container } from "@/components/Container";
import { Layout } from "@/components/Layout";
import { RoleBadge } from "@/components/RoleBadge";
import { useCurrentLocale } from "@/hooks/use-current-locale";
import { getServerAuthSession } from "@/server/common/get-server-auth-session";

const Me = () => {
  const { data: session } = useSession();

  const locale = useCurrentLocale();

  useEffect(() => {
    console.log(session);
  }, [session]);

  if (!session) {
    return null;
  }

  if (!session.user) {
    return null;
  }

  return (
    <Layout title="Profile">
      <Container className="lg:place-items-center">
        <div className="card flex w-full flex-col gap-2 lg:w-96">
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

export const getServerSideProps: GetServerSideProps = async ({ req, res, locale = "en" }) => {
  const session = await getServerAuthSession({ req, res });
  if (!session) {
    return {
      props: {
        messages: {},
        session: null,
      },
      redirect: {
        destination: `login`,
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

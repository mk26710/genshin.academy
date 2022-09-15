import type { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next";

import { getProviders, signIn } from "next-auth/react";

import { Container } from "@/components/Container";
import { Layout } from "@/components/Layout";
import { getServerAuthSession } from "@/server/common/get-server-auth-session";

const SignIn: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  providers,
}) => {
  return (
    <Layout title="Sign in">
      <Container className="lg:place-content-center">
        {providers && (
          <div className="card flex flex-col gap-y-2 lg:w-[24rem]">
            <h1 className="self-center text-xl font-semibold">Sign in</h1>
            <p className="mb-4 text-center text-sm">
              Currently our website doesn&apos;t support accounts for regular users. Only selected
              people can use this feature.
            </p>

            {Object.values(providers).map((provider) => (
              <button
                onClick={() => signIn(provider.id)}
                key={provider.id}
                className="self-center rounded-md bg-primary-100 px-3 py-2 text-sm text-primary-700 transition-all duration-200 hover:bg-primary-200 dark:bg-primary-900 dark:text-primary-300 dark:hover:bg-primary-800"
              >
                Sign in with {provider.name}
              </button>
            ))}
          </div>
        )}
      </Container>
    </Layout>
  );
};

export default SignIn;

interface GSSProps {
  messages?: unknown;
  providers: Awaited<ReturnType<typeof getProviders>>;
}

export const getServerSideProps: GetServerSideProps<GSSProps> = async ({
  req,
  res,
  locale = "en",
}) => {
  const messages = {
    common: (await import(`#/locales/${locale}/common.json`)).default,
    meta: (await import(`#/locales/${locale}/meta.json`)).default,
    footer: (await import(`#/locales/${locale}/footer.json`)).default,
    home: (await import(`#/locales/${locale}/home.json`)).default,
  };

  const session = await getServerAuthSession({ req, res });
  if (session) {
    return {
      props: {
        providers: null,
      },
      redirect: {
        destination: `/${locale}/me`,
      },
    };
  }

  const providers = await getProviders();

  return {
    props: { messages, providers },
  };
};

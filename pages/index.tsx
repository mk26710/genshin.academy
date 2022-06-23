import { MainLayout } from "@/components/MainLayout";
import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Index</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainLayout verticalCenter>
        <div className="flex flex-col items-center">
          <h1 className="font-bold text-4xl">Hello, user!</h1>
          <p>Welcome to genshin.zenless.club!</p>
        </div>
      </MainLayout>
    </>
  );
};

export default Home;

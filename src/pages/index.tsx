import type { NextPage } from "next";

import dynamic from "next/dynamic";

import { Container } from "@/components/Container";
import { Layout } from "@/components/Layout";

const BirthdayToday = dynamic(() => import("../components/BirthdaysToday"), { ssr: false });

const Home: NextPage = () => {
  return (
    <Layout
      title="Home"
      description="Genshin Impact characters data, calculators, playstyle guides and more!"
    >
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          <BirthdayToday />
        </div>
      </Container>
    </Layout>
  );
};

export default Home;

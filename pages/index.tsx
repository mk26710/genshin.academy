import type { NextPage } from "next";

import { Container } from "@/components/Container";
import { Layout } from "@/components/Layout";

const Home: NextPage = () => {
  return (
    <Layout
      title="Home"
      description="Genshin Impact characters data, calculators, playstyle guides and more!"
    >
      <Container verticalCenter>
        <div className="flex flex-col items-center">
          <h1 className="font-bold text-4xl">Hello, user!</h1>
          <p>Welcome to genshin.zenless.club!</p>
        </div>
      </Container>
    </Layout>
  );
};

export default Home;

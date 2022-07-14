import type { NextPage } from "next";

import { BirthdayToday } from "@/components/BirthdaysToday";
import { ClientOnly } from "@/components/ClientOnly";
import { Container } from "@/components/Container";
import { Layout } from "@/components/Layout";

const Home: NextPage = () => {
  return (
    <Layout
      title="Home"
      description="Genshin Impact characters data, calculators, playstyle guides and more!"
    >
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          <ClientOnly>
            <BirthdayToday />
          </ClientOnly>
        </div>
      </Container>
    </Layout>
  );
};

export default Home;

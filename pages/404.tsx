import type { NextPage } from "next";

import { Container } from "@/components/Container";
import { Layout } from "@/components/Layout";

const NotFound: NextPage = () => {
  return (
    <Layout title="404" description="Not found!">
      <Container verticalCenter>
        <div className="flex flex-row">
          <h1 className="text-xl font-semibold mr-2 pr-2 border-r align-middle">404</h1>
          <h2 className="text-xl align-middle">Not fond</h2>
        </div>
      </Container>
    </Layout>
  );
};

export default NotFound;

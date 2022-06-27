import { NextPage } from "next";

import { Container } from "@/components/Container";
import { Layout } from "@/components/Layout";

const NotFound: NextPage = () => {
  return (
    <Layout title="404" description="Not found!">
      <Container verticalCenter>404 NOT FOUND</Container>
    </Layout>
  );
};

export default NotFound;

import { Container } from "@/components/Container";
import { Layout } from "@/components/Layout";
import { NextPage } from "next";

const NotFound: NextPage = () => {
  return (
    <Layout title="404" description="Not found!">
      <Container verticalCenter>404 NOT FOUND</Container>
    </Layout>
  );
};

export default NotFound;

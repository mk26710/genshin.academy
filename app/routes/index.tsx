import type { MetaFunction } from "@remix-run/node";
import { Container } from "~/components/Container";

export const meta: MetaFunction = () => ({
  title: "Home - GENSHIN.ZENLESS",
});

export default function Index() {
  return <Container>Hello</Container>;
}

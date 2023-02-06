import type { MetaFunction } from "@remix-run/node";

import { Main } from "~/components/main";

export const meta: MetaFunction = () => {
  return {
    title: "Home",
  };
};

export default function HomePage() {
  return (
    <Main>
      <Main.Container>
        <h1>Home Page</h1>
      </Main.Container>
    </Main>
  );
}

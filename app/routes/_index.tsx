import type { MetaFunction } from "@remix-run/node";

import { Main } from "~/components/main";
import { generateTitle } from "~/utils/meta-generator";

export const meta: MetaFunction = () => {
  return {
    title: generateTitle("Home"),
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

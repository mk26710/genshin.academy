import type { LoaderArgs } from "@remix-run/node";
import { Main } from "~/components/main";
import { requireUserWithEveryFlag } from "~/utils/session.server";

export async function loader({ request }: LoaderArgs) {
  await requireUserWithEveryFlag(request, ["NEW_CHARACTER"]);
  return null;
}

export default function CharacterNewRecord() {
  return (
    <Main>
      <Main.Container>1</Main.Container>
    </Main>
  );
}

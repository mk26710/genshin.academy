import type { LoaderArgs } from "@remix-run/node";

import { json } from "@remix-run/node";

import { Main } from "~/components/main";
import { db } from "~/db/prisma.server";
import { CharacterIdSchema } from "~/schemas/character.server";
import { resolveLocale } from "~/utils/i18n.server";

export const loader = async ({ request, params }: LoaderArgs) => {
  const id = await CharacterIdSchema.parseAsync(params.id);
  const locale = await resolveLocale(request);

  const entry = await db.characterEntry.findUnique({
    where: {
      metaId_locale: {
        locale,
        metaId: id,
      },
    },
    include: {
      meta: {
        include: {
          assets: true,
          voiceActors: true,
        },
      },
    },
  });

  return json({ entry });
};

export default function CharacterInfo() {
  return (
    <Main>
      <Main.Container></Main.Container>
    </Main>
  );
}

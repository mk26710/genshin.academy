import type { LoaderArgs } from "@remix-run/node";

import { json } from "@remix-run/node";
import type { V2_MetaFunction } from "@remix-run/react";
import { Link, useLoaderData } from "@remix-run/react";
import { useTranslations } from "use-intl";
import { AutoElementIcon } from "~/components/icons/genshin/elements";

import { Main } from "~/components/main";
import { db } from "~/db/prisma.server";
import { useVisitorLocale } from "~/hooks/use-visitor-locale";
import { CharacterIdSchema } from "~/schemas/character.server";
import { description, title } from "~/utils/html-meta";
import { resolveLocale } from "~/utils/i18n.server";
import { notFound } from "~/utils/responses.server";

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

  if (entry == null) {
    throw notFound({});
  }

  return json({ entry });
};

export const meta: V2_MetaFunction<typeof loader> = ({ data }) => {
  return [
    ...title(data.entry.name),
    ...description(data.entry.description),
    { name: "theme-color", content: data.entry.meta.accentColor },
  ];
};

export default function CharacterInfo() {
  const { entry } = useLoaderData<typeof loader>();

  const t = useTranslations();
  const locale = useVisitorLocale();

  const birthDate = new Date(`1970-${entry.meta.birthMonth}-${entry.meta.birthDay}`);

  return (
    <Main>
      <Main.Container>
        <div className="daisy-breadcrumbs mb-4 text-sm">
          <ul>
            <li>
              <Link to="/characters">{t("common.characters", { count: 99 })}</Link>
            </li>
            <li>{entry.name}</li>
          </ul>
        </div>

        <div className="flex flex-row rounded-box bg-base-200 p-6">
          <div className="flex flex-1 flex-col gap-4">
            <h2 className="daisy-card-title">
              {entry.meta.element != null && (
                <AutoElementIcon elementName={entry.meta.element} className="h-10 w-10" />
              )}
              <span className="flex flex-col">
                <span>{entry.name}</span>
                <span className="text-sm font-medium opacity-70">{entry.title}</span>
              </span>
            </h2>

            {entry.description != null && <p className="">{entry.description}</p>}

            <div className="grid grid-flow-dense grid-cols-3 gap-4">
              <div>
                <label>Weapon</label>
                <p>{entry.meta.weapon}</p>
              </div>

              <div>
                <label>Element</label>
                <p>{entry.meta.element}</p>
              </div>

              <div>
                <label>Rarity</label>
                <p>{entry.meta.rarity}</p>
              </div>

              <div>
                <label>Affiliation</label>
                <p>{entry.affiliation}</p>
              </div>

              <div>
                <label>Birthday</label>
                <p>
                  {Intl.DateTimeFormat(locale, { day: "numeric", month: "long" }).format(birthDate)}
                </p>
              </div>
            </div>
          </div>

          <figure>
            <img
              src={entry.meta.assets.find((ass) => ass.type === "AVATAR")?.url}
              className="max-h-[400px]"
            />
          </figure>
        </div>
      </Main.Container>
    </Main>
  );
}

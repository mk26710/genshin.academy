import type { LoaderArgs, MetaFunction, SerializeFrom } from "@remix-run/node";
import type { RouteHandle } from "~/types/common";
import type { ThrownErrorResponse } from "~/utils/responses.server";

import {
  NavLink,
  useCatch,
  useLoaderData,
  useLocation,
  useOutlet,
  useSearchParams,
} from "@remix-run/react";
import clsx from "clsx";
import { useTranslations } from "use-intl";

import { Container } from "~/components/Container";
import { Paper } from "~/components/Paper";
import { useVisitorLocale } from "~/hooks/use-visitor-locale";
import { getCharacterById } from "~/models/characters.server";
import { resolveLocale } from "~/utils/i18n.server";
import { generateMeta } from "~/utils/meta-generator";
import { notFound, serverError } from "~/utils/responses.server";

export const handle: RouteHandle = {
  id: "character",
  withScrollRestoration: true,
};

export const loader = async ({ request, params }: LoaderArgs) => {
  if (typeof params?.id !== "string") {
    throw serverError({ message: "Character ID is not a string" });
  }

  const resolvedLocale = await resolveLocale(request);
  const character = await getCharacterById(params.id, {
    langs: [resolvedLocale],
  });

  if (!character) {
    throw notFound({ code: "character.notfound", message: "Character not found" });
  }

  if (!character.identity.some((cid) => cid.lang === resolvedLocale)) {
    throw notFound({
      code: "untranslated",
      message: "This page is not available in your language, please, try checking English",
    });
  }

  return { character };
};

export type Loader = SerializeFrom<typeof loader>;

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data?.character || !data?.character.identity) return { title: "Error" };

  return generateMeta({
    title: data.character.identity.at(0)?.name,
    description: data.character.identity.at(0)?.description,
    imageUrl: `/img/characters/${data.character.id}/icon.webp`,
    themeColor: data.character.accentColor,
  });
};

const links = [
  { href: ".", i18n: "common.overview" },
  { href: "./constellations", i18n: "characters.constellations" },
];

export interface ContextType {
  data: Loader["character"];
  identity: Loader["character"]["identity"][number];
  constellations: Loader["character"]["constellations"];
}

const CharactersIdRoute = () => {
  const t = useTranslations();
  const locale = useVisitorLocale();
  const { search } = useLocation();

  const { character } = useLoaderData() as Loader;
  const identity = character.identity.find((record) => record.lang === locale);

  const outletContext = {
    data: character,
    identity: identity as NonNullable<typeof identity>,
    constellations: character.constellations,
  } as ContextType; // once TS4.9 is supported in ESLint, should replace with satisfies

  const outlet = useOutlet(outletContext);

  return (
    <Container>
      <div className="flex flex-col flex-wrap">
        <Paper className="flex flex-row overflow-x-auto rounded-b-none border-b-0 py-0 px-2">
          {links.map(({ href, i18n }) => (
            <NavLink
              key={i18n}
              to={href + search}
              className={({ isActive }) =>
                clsx("mx-2 py-4", isActive && "opacity-100", !isActive && "opacity-60")
              }
            >
              {t(i18n)}
            </NavLink>
          ))}
        </Paper>
        <Paper className="grid grid-flow-row auto-rows-min grid-cols-1 rounded-t-none ">
          {outlet}
        </Paper>
      </div>
    </Container>
  );
};

export default CharactersIdRoute;

export const CatchBoundary = () => {
  const t = useTranslations();

  const [searchParams, setSearchParams] = useSearchParams();
  const caught = useCatch<ThrownErrorResponse>();

  const handleViewInEnglish = async () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("locale", "en");

    setSearchParams(newSearchParams, { replace: true });
  };

  return (
    <Container className="flex items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <h3 className="text-8xl font-bold">{caught.status}</h3>
        <p className="opacity-70">{caught.data?.message || caught.statusText}</p>

        {caught?.data?.code === "untranslated" && (
          <button className="button mt-6" onClick={handleViewInEnglish}>
            {t("common.view-in-english")}
          </button>
        )}
      </div>
    </Container>
  );
};

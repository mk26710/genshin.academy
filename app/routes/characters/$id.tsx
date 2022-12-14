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

import { Button } from "~/components/Button";
import { Container } from "~/components/Container";
import { Paper } from "~/components/Paper";
import { prisma } from "~/db/prisma.server";
import { generateMeta } from "~/utils/meta-generator";
import { notFound, serverError } from "~/utils/responses.server";

export const handle: RouteHandle = {
  id: "character",
  withScrollRestoration: true,
};

export const loader = async ({ params }: LoaderArgs) => {
  if (typeof params?.id !== "string") {
    throw serverError({ message: "Character ID is not a string" });
  }

  const info = await prisma.characterInfo.findUnique({
    where: {
      entryLanguage_characterId: {
        entryLanguage: "en",
        characterId: params.id,
      },
    },
    include: {
      details: {
        include: {
          assets: true,
        },
      },
    },
  });

  if (!info) {
    throw notFound({ code: "character.notfound", message: "Character not found" });
  }

  return { info };
};

export type Loader = SerializeFrom<typeof loader>;

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data?.info) return { title: "Error" };

  const imageUrl =
    data.info.details.assets.find((asset) => asset.type === "ICON")?.url ??
    `/img/characters/${data.info.characterId}/icon.webp`;

  return generateMeta({
    title: data.info.name,
    description: data.info.description ?? undefined,
    imageUrl,
    themeColor: "#" + data.info.details.accentColor.toString(16).padStart(6, "0"),
  });
};

const links = [
  { href: ".", i18n: "common.overview" },
  { href: "./constellations", i18n: "characters.constellations" },
];

export type ContextType = Loader;

const CharactersIdRoute = () => {
  const t = useTranslations();
  const { search } = useLocation();

  const { info } = useLoaderData() as Loader;

  const outletContext = { info } as ContextType; // once TS4.9 is supported in ESLint, should replace with satisfies
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
          <Button color="primary" variant="light" className="mt-6" onClick={handleViewInEnglish}>
            {t("common.view-in-english")}
          </Button>
        )}
      </div>
    </Container>
  );
};

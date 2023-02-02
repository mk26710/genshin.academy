import type { LoaderArgs, MetaFunction, SerializeFrom } from "@remix-run/node";
import type { ChangeEvent, FunctionComponent } from "react";
import type { RouteHandle } from "~/types/common";

import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useAtom } from "jotai";
import { useEffect, useDeferredValue } from "react";
import { useTranslations } from "use-intl";

import {
  characterSearchAtom,
  charactersFilterFivestarsAtom,
  charactersFilterFourstarsAtom,
} from "~/atoms/characterSearch";
import { CharacterCard } from "~/components/cards/CharacterCard";
import { Checkbox } from "~/components/Checkbox";
import { Main } from "~/components/Main";
import { prisma } from "~/db/prisma.server";
import { resolveLocale } from "~/utils/i18n.server";

export const handle: RouteHandle = {
  id: "characters",
  withScrollRestoration: true,
};

export const meta: MetaFunction = ({}) => {
  return {
    title: "Characters - GENSHIN.ACADEMY",
  };
};

export const loader = async ({ request }: LoaderArgs) => {
  const locale = await resolveLocale(request);

  const entries = await prisma.characterEntry.findMany({
    orderBy: [
      {
        name: "asc",
      },
    ],
    where: {
      locale: locale,
      meta: {
        id: {
          not: {
            equals: undefined,
          },
        },
      },
    },
    include: {
      meta: {
        select: {
          id: true,
          element: true,
          rarity: true,
          association: true,
          releaseDate: true,
          weapon: true,
          assets: {
            where: {
              isPublic: true,
            },
          },
        },
      },
    },
  });

  return json({ entries });
};

export type Loader = SerializeFrom<typeof loader>;

const SearchAndFilter: FunctionComponent = () => {
  const t = useTranslations();

  const [search, setSearch] = useAtom(characterSearchAtom);
  const [fivestars, setFivestars] = useAtom(charactersFilterFivestarsAtom);
  const [fourstars, setFourstars] = useAtom(charactersFilterFourstarsAtom);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleFivestarsCheckboxChange = () => {
    setFivestars(!fivestars);
  };

  const handleFourstarsCheckboxChange = () => {
    setFourstars(!fourstars);
  };

  return (
    <>
      <div className="mb-6 flex flex-row gap-4 lg:flex-row">
        <input
          placeholder={t(`common.search-by-name`)}
          className="input"
          onChange={handleChange}
          value={search}
        />

        <div
          role="radiogroup"
          className="inline-flex border-collapse items-center gap-2 -space-x-px rounded-md text-xs"
        >
          <Checkbox label="5*" checked={fivestars} onChange={handleFivestarsCheckboxChange} />
          <Checkbox label="4*" checked={fourstars} onChange={handleFourstarsCheckboxChange} />
        </div>
      </div>
    </>
  );
};

const CharactersIndex = () => {
  const { entries } = useLoaderData() as Loader;

  const [search] = useAtom(characterSearchAtom);
  const deferredSearch = useDeferredValue(search);

  const [showFivestars] = useAtom(charactersFilterFivestarsAtom);
  const [showFourstars] = useAtom(charactersFilterFourstarsAtom);

  useEffect(() => {
    console.log(entries);
  }, []);

  const filteredEntries = entries
    .filter((entry) => entry.name.toLowerCase().includes(deferredSearch.toLowerCase()))
    .reduce<Loader["entries"]>((acc, current) => {
      if (!showFivestars && current.meta?.rarity === 5) {
        return acc;
      }

      if (!showFourstars && current.meta?.rarity === 4) {
        return acc;
      }

      return [...acc, current];
    }, []);

  return (
    <Main>
      <Main.Container>
        <SearchAndFilter />

        <div className="mt-4 flex flex-row flex-wrap justify-evenly gap-4 md:justify-start">
          {filteredEntries.map((entry) => (
            <CharacterCard
              key={entry.id}
              id={entry.meta.id ?? "unknown"}
              name={entry.name}
              assets={entry.meta.assets}
              element={entry.meta.element}
              rarity={entry.meta.rarity}
            />
          ))}
        </div>
      </Main.Container>
    </Main>
  );
};

export default CharactersIndex;

import type { LoaderArgs, MetaFunction, SerializeFrom } from "@remix-run/node";
import type { ChangeEvent, FunctionComponent } from "react";

import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useAtom } from "jotai";
import { useId, useEffect, useDeferredValue } from "react";
import { useTranslations } from "use-intl";

import {
  characterSearchAtom,
  charactersFilterFivestarsAtom,
  charactersFilterFourstarsAtom,
} from "~/atoms/characterSearch";
import { CharacterCard } from "~/components/character-card";
import { Main } from "~/components/main";
import { Input } from "~/components/ui/input";
import { prisma } from "~/db/prisma.server";
import { resolveLocale } from "~/utils/i18n.server";

export const meta: MetaFunction = () => {
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
  const id = useId();

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
        <Input
          placeholder={t(`common.search-by-name`)}
          onChange={handleChange}
          value={search}
          className="lg:max-w-xs"
        />

        <div
          role="radiogroup"
          className="inline-flex border-collapse items-center gap-2 -space-x-px rounded-md text-xs"
        >
          <div className="flex flex-row items-center gap-1">
            <input
              id={`${id}:fivestars`}
              type="checkbox"
              className="form-checkbox h-6 w-6 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              checked={fivestars}
              onChange={handleFivestarsCheckboxChange}
            />
            <label htmlFor={`${id}:fivestars`} className="select-none text-sm font-medium">
              5*
            </label>
          </div>

          <div className="flex flex-row items-center gap-1">
            <input
              id={`${id}:fourstars`}
              type="checkbox"
              className="form-checkbox h-6 w-6 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              checked={fourstars}
              onChange={handleFourstarsCheckboxChange}
            />
            <label htmlFor={`${id}:fourstars`} className="select-none text-sm font-medium">
              4*
            </label>
          </div>
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

        <div className="flex flex-row flex-wrap justify-evenly gap-4 md:justify-start">
          {filteredEntries.map((entry) => {
            const iconUrl = entry.meta.assets.find((asset) => asset.type === "ICON")?.url;

            return (
              <CharacterCard
                key={entry.id}
                name={entry.name}
                element={entry.meta.element}
                rarity={entry.meta.rarity}
                to={`./${entry.meta.id}`}
                iconUrl={iconUrl}
                className="max-w-[112px]"
              />
            );
          })}
        </div>
      </Main.Container>
    </Main>
  );
};

export default CharactersIndex;

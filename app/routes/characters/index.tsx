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
import { Container } from "~/components/Container";
import { prisma } from "~/db/prisma.server";

export const handle: RouteHandle = {
  id: "characters",
  withScrollRestoration: true,
};

export const meta: MetaFunction = ({}) => {
  return {
    title: "Characters - GENSHIN.ACADEMY",
  };
};

export const loader = async ({}: LoaderArgs) => {
  const characters = await prisma.characterInfo.findMany({
    include: {
      details: {
        include: {
          assets: true,
        },
      },
    },
    orderBy: [
      {
        name: "asc",
      },
    ],
    where: {
      entryLanguage: "en",
    },
  });

  return json({ characters });
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
  const { characters } = useLoaderData() as Loader;

  const [search] = useAtom(characterSearchAtom);
  const deferredSearch = useDeferredValue(search);

  const [showFivestars] = useAtom(charactersFilterFivestarsAtom);
  const [showFourstars] = useAtom(charactersFilterFourstarsAtom);

  useEffect(() => {
    console.log(characters);
  }, []);

  const filteredCharacters = characters
    .filter((c) => c.name.toLowerCase().includes(deferredSearch.toLowerCase()))
    .reduce<Loader["characters"]>((acc, current) => {
      if (!showFivestars && current.details.rarity === 5) {
        return acc;
      }

      if (!showFourstars && current.details.rarity === 4) {
        return acc;
      }

      return [...acc, current];
    }, []);

  return (
    <Container>
      <SearchAndFilter />

      <div className="mt-4 flex flex-row flex-wrap justify-evenly gap-4 md:justify-start">
        {filteredCharacters.map((c) => (
          <CharacterCard
            key={c.details.id}
            id={c.characterId}
            name={c.name}
            assets={c.details.assets}
            element={c.details.element}
            rarity={c.details.rarity}
          />
        ))}
      </div>
    </Container>
  );
};

export default CharactersIndex;

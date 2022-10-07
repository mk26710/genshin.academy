import type { LoaderArgs, MetaFunction, SerializeFrom } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useAtom } from "jotai";
import type { ChangeEvent, FunctionComponent } from "react";
import { useEffect } from "react";
import { useDeferredValue } from "react";
import { useTranslations } from "use-intl";
import {
  characterSearchAtom,
  charactersFilterFivestarsAtom,
  charactersFilterFourstarsAtom,
} from "~/atoms/characterSearch";
import { CharacterCard } from "~/components/cards/CharacterCard";
import { Container } from "~/components/Container";
import { Input } from "~/components/Input";
import { getCharactersList } from "~/models/characters.server";
import { resolveLocale } from "~/utils/i18n.server";
import { defaultLocale } from "~/utils/locales";

export const meta: MetaFunction = ({}) => ({
  title: "Characters - GENSHIN.ZENLESS",
});

type LoaderData = SerializeFrom<typeof loader>;

export const loader = async ({ request }: LoaderArgs) => {
  const locale = await resolveLocale(request);
  const characters = await getCharactersList({ langs: [locale, defaultLocale] });

  return json({ characters });
};

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
        <Input placeholder={t(`common.search-by-name`)} onChange={handleChange} value={search} />

        <div
          role="radiogroup"
          className="inline-flex border-collapse items-center -space-x-px rounded-md text-xs"
        >
          <span>
            <input
              id="fivestar-filter"
              type="checkbox"
              className="peer hidden"
              onChange={handleFivestarsCheckboxChange}
              checked={fivestars}
            />
            <label
              htmlFor="fivestar-filter"
              className="box-border h-10 rounded-l-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-[#000] peer-checked:border-primary-700 peer-checked:bg-primary-100 peer-checked:text-primary-700"
            >
              5*
            </label>
          </span>

          <span>
            <input
              id="fourstar-filter"
              type="checkbox"
              className="peer hidden"
              onChange={handleFourstarsCheckboxChange}
              checked={fourstars}
            />
            <label
              htmlFor="fourstar-filter"
              className="box-border h-10 rounded-r-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-[#000] peer-checked:border-primary-700 peer-checked:bg-primary-100 peer-checked:text-primary-700"
            >
              4*
            </label>
          </span>
        </div>
      </div>
    </>
  );
};

const CharactersIndex = () => {
  const { characters } = useLoaderData() as LoaderData;

  const [search] = useAtom(characterSearchAtom);
  const deferredSearch = useDeferredValue(search);

  const [showFivestars] = useAtom(charactersFilterFivestarsAtom);
  const [showFourstars] = useAtom(charactersFilterFourstarsAtom);

  useEffect(() => {
    console.log(characters);
  }, []);

  const filteredCharacters = characters
    .filter((c) => c.identity.at(0)?.name.toLowerCase().includes(deferredSearch.toLowerCase()))
    .reduce<Awaited<ReturnType<typeof getCharactersList>>>((acc, current) => {
      if (!showFivestars && current.rarity === 5) {
        return acc;
      }

      if (!showFourstars && current.rarity === 4) {
        return acc;
      }

      return [...acc, current];
    }, []);

  return (
    <Container>
      <SearchAndFilter />

      <div className="mt-4 flex flex-row flex-wrap justify-evenly gap-4 md:justify-start">
        {filteredCharacters.map((c) => (
          <CharacterCard key={c.id} character={c} />
        ))}
      </div>
    </Container>
  );
};

export default CharactersIndex;

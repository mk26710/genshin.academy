import type { LoaderArgs, SerializeFrom } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useCatch, useLoaderData, useSearchParams } from "@remix-run/react";
import { useEffect } from "react";
import { useTranslations } from "use-intl";
import { Container } from "~/components/Container";
import { useVisitorLocale } from "~/hooks/use-visitor-locale";
import { getCharacterById } from "~/models/characters.server";
import { avatarPath } from "~/utils/helpers";
import { resolveLocale } from "~/utils/i18n.server";
import { jsonError } from "~/utils/responses.server";

export const loader = async ({ request, params }: LoaderArgs) => {
  if (typeof params?.id !== "string") {
    throw jsonError({ message: "ID is somehow not a string" }, { status: 500 });
  }

  const resolvedLocale = await resolveLocale(request);
  const characterData = await getCharacterById(params.id, {
    langs: [resolvedLocale],
  });

  if (!characterData) {
    throw jsonError(
      { code: "character.notfound", message: "Character not found." },
      { status: 404 },
    );
  }

  if (!characterData.identity.some((cid) => cid.lang === resolvedLocale)) {
    throw jsonError(
      {
        code: "untranslated",
        message: "This page is not available in your language, please, try checking English.",
      },
      { status: 404 },
    );
  }

  return json(characterData);
};

type LoaderData = SerializeFrom<typeof loader>;

const CharactersIdRoute = () => {
  const locale = useVisitorLocale();

  const {
    character,
    identity: identityEntries,
    constellations: constellationsEntries,
  } = useLoaderData() as LoaderData;

  const identity = identityEntries.find((entry) => entry.lang === locale);
  const constellations = constellationsEntries.filter((entry) => entry.lang === locale);

  const elementSrc = `/img/elements/${character.vision.toLowerCase()}/icon.webp`;

  useEffect(() => {
    console.log(identity);
  }, []);

  return (
    <Container>
      <div className="card flex flex-col-reverse px-6 pt-6 pb-8 lg:flex-row">
        <div className="flex-1 grow">
          <div className="mb-4 flex items-center gap-[var(--default-gap)]">
            <h2 className="align-middle text-4xl font-semibold">{identity?.name}</h2>
            <img className="h-6 align-middle " src={elementSrc} alt="Element" />
          </div>

          <p id="description" className="whitespace-pre-line">
            {identity?.description}
          </p>

          <h2 id="consteallations" className="mt-6 mb-4 text-2xl font-semibold">
            Consteallations
          </h2>

          <ol className="list-decimal pl-4 marker:text-primary-500">
            {constellations?.map(({ level, description, name }) => (
              <li key={`const-${level}`} id={`constellation-${level}`} className="[&+li]:mt-2">
                <h3 className="font-semibold00 text-lg">{name}</h3>
                <p className="whitespace-pre-line">{description}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="lg:max-w-xs xl:max-w-xl">
          <img src={avatarPath(character.id, "webp")} alt={`${character.id} gacha image`} />
        </div>
      </div>
    </Container>
  );
};

export default CharactersIdRoute;

export const CatchBoundary = () => {
  const t = useTranslations();

  const [searchParams, setSearchParams] = useSearchParams();
  const caught = useCatch();

  const handleViewInEnglish = async () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("locale", "en");

    setSearchParams(newSearchParams, { replace: true });
  };

  return (
    <Container className="flex items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <h3 className="text-8xl font-bold">{caught.status}</h3>
        <p className="opacity-70">{caught.statusText}</p>

        {caught?.data?.error?.code === "untranslated" && (
          <button className="button mt-6" onClick={handleViewInEnglish}>
            {t("common.view-in-english")}
          </button>
        )}
      </div>
    </Container>
  );
};

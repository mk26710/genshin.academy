import type { LoaderArgs, MetaFunction } from "@remix-run/node";

import { StarIcon, SparklesIcon, CakeIcon } from "@heroicons/react/20/solid";
import { GlobeAsiaAustraliaIcon, InformationCircleIcon } from "@heroicons/react/24/solid";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useTranslations } from "use-intl";

import {
  AnemoIcon,
  CryoIcon,
  DendroIcon,
  ElectroIcon,
  GeoIcon,
  HydroIcon,
  PyroIcon,
} from "~/components/icons/genshin/elements";
import { Main } from "~/components/Main";
import { prisma } from "~/db/prisma.server";
import { useVisitorLocale } from "~/hooks/use-visitor-locale";
import { resolveLocale } from "~/utils/i18n.server";
import { generateMeta } from "~/utils/meta-generator";
import { badRequest, notFound } from "~/utils/responses.server";

export const loader = async ({ request, params }: LoaderArgs) => {
  const id = params.id;
  if (typeof id !== "string") {
    throw badRequest({
      error: {
        message: "Requested ID is not a string",
      },
    });
  }

  const locale = await resolveLocale(request);

  const characterData = await prisma.characterEntry.findUnique({
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

  if (characterData === null) {
    throw notFound({
      error: {
        message: "Character with provided ID could not be found",
      },
    });
  }

  return json({ characterData });
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return generateMeta({
    title: data?.characterData?.name,
    description: data?.characterData?.description ?? undefined,
    imageUrl:
      data?.characterData?.meta?.assets?.find((asset) => asset.type === "ICON")?.url ?? undefined,
    themeColor: data?.characterData?.meta?.accentColor,
    keywords: data?.characterData?.name,
  });
};

export default function CharacterInfo() {
  const locale = useVisitorLocale();
  const t = useTranslations();

  const { characterData: character } = useLoaderData<typeof loader>();
  const birthdayDate = new Date(`1700-${character.meta.birthMonth}-${character.meta.birthDay}`);

  const avatarSrc = character.meta.assets.find((asset) => asset.type === "AVATAR")?.url;

  return (
    <Main>
      <Main.Container>
        <div className="flex w-full flex-1 flex-row rounded-box border-gray-300 bg-white px-4 py-5 shadow sm:p-6">
          <div className="flex flex-col space-y-6">
            <div className="inline-grid grid-cols-[auto_1fr] gap-2">
              <h3 className="text-3xl font-semibold">{character.name}</h3>

              {character.meta.element === "ANEMO" && (
                <AnemoIcon className="h-6 w-6 self-center text-[#a4f2cb]" />
              )}
              {character.meta.element === "CRYO" && (
                <CryoIcon className="h-6 w-6 self-center text-[#bef7f9]" />
              )}
              {character.meta.element === "DENDRO" && (
                <DendroIcon className="h-6 w-6 self-center text-[#aee42f]" />
              )}
              {character.meta.element === "ELECTRO" && (
                <ElectroIcon className="h-6 w-6 self-center text-[#debaff]" />
              )}
              {character.meta.element === "GEO" && (
                <GeoIcon className="h-6 w-6 self-center text-[#f0cb50]" />
              )}
              {character.meta.element === "HYDRO" && (
                <HydroIcon className="h-6 w-6 self-center text-[#09e5ff]" />
              )}
              {character.meta.element === "PYRO" && (
                <PyroIcon className="h-6 w-6 self-center text-[#ffa870]" />
              )}

              <p className="col-span-full">{character.description}</p>
            </div>

            <div className="block md:hidden">
              <img src={avatarSrc} />
            </div>

            <div className="grid grid-flow-dense auto-rows-auto grid-cols-1 gap-4 xs:grid-cols-2 md:grid-cols-3">
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-box border border-gray-300 bg-gray-200 text-gray-700 shadow">
                  <SparklesIcon className="h-5 w-5" />
                </div>
                <span className="flex flex-row">
                  {Array(character.meta.rarity)
                    .fill(null)
                    .map((_, idx) => (
                      <StarIcon key={idx} className="h-5 w-5 text-orange-500" />
                    ))}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-box border border-gray-300 bg-gray-200 text-gray-700 shadow">
                  <GlobeAsiaAustraliaIcon className="h-5 w-5" />
                </div>
                <span className="flex flex-row">
                  {t("genshin." + character.meta.association?.toLowerCase())}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-box border border-gray-300 bg-gray-200 text-gray-700 shadow">
                  <InformationCircleIcon className="h-5 w-5" />
                </div>
                <span className="flex flex-row">
                  {t("genshin." + character.meta.weapon?.toLowerCase())}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-box border border-gray-300 bg-gray-200 text-gray-700 shadow">
                  <CakeIcon className="h-5 w-5" />
                </div>
                <span className="flex flex-row">
                  {Intl.DateTimeFormat(locale, { day: "numeric", month: "long" }).format(
                    birthdayDate,
                  )}
                </span>
              </div>
            </div>
          </div>

          <div className="hidden w-full min-w-[350px] max-w-[350px] object-contain md:block lg:max-w-[500px] xl:max-w-[600px]">
            <img src={avatarSrc} />
          </div>
        </div>
      </Main.Container>
    </Main>
  );
}

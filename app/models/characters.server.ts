import { prisma } from "~/db/prisma.server";

interface GetCharactersOptions {
  langs?: string[];
}

export const getCharactersList = async (opts?: GetCharactersOptions) => {
  return await prisma.genshinCharacter.findMany({
    select: {
      id: true,
      rarity: true,
      vision: true,
      weapon: true,
      identity: {
        where: {
          lang: {
            in: opts?.langs,
          },
        },
        select: {
          lang: true,
          name: true,
        },
      },
    },
  });
};

export const getCharactersByBirthday = async (
  day: number,
  month: number,
  opts?: GetCharactersOptions,
) => {
  return await prisma.genshinCharacter.findMany({
    where: {
      birthDay: day,
      birthMonth: month,
    },
    select: {
      id: true,
      identity: {
        where: {
          lang: {
            in: opts?.langs,
          },
        },
        select: {
          lang: true,
          name: true,
        },
      },
    },
  });
};

type GetCharacterById = {
  langs?: string[];
};

export const getCharacterById = async (id: string, opts?: GetCharacterById) => {
  const character = await prisma.genshinCharacter.findUnique({ where: { id } });
  if (!character) {
    return null;
  }

  const identity = await prisma.genshinCharacterIdentity.findMany({
    where: {
      lang: {
        in: opts?.langs,
      },
      genshinCharacterId: id,
    },
  });

  // const identity = identityEntries.reduce((acc, current) => {
  //   return { ...acc, [current.lang]: current };
  // }, {} as Record<string, typeof identityEntries[number]>);

  const constellations = await prisma.genshinCharacterConstellations.findMany({
    where: {
      lang: {
        in: opts?.langs,
      },
      genshinCharacterId: id,
    },
  });

  return { character, identity, constellations };
};

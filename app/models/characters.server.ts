import { db } from "~/db/prisma.server";

interface GetCharactersOptions {
  langs?: string[];
}

export const getCharactersList = async (opts?: GetCharactersOptions) => {
  return await db.genshinCharacter.findMany({
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
      assets: true,
    },
  });
};

export const getCharactersByBirthday = async (
  day: number,
  month: number,
  opts?: GetCharactersOptions,
) => {
  return await db.genshinCharacter.findMany({
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
      assets: true,
    },
  });
};

type GetCharacterById = {
  langs?: string[];
};

export const getCharacterById = async (id: string, opts?: GetCharacterById) => {
  const character = await db.genshinCharacter.findUnique({
    where: { id },
    include: {
      assets: true,
      constellations: {
        where: {
          lang: {
            in: opts?.langs,
          },
        },
      },
      identity: {
        where: {
          lang: {
            in: opts?.langs,
          },
        },
      },
    },
  });

  if (!character) {
    return null;
  }
  return character;
};

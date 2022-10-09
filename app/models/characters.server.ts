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

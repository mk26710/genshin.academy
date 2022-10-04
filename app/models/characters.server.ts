import { prisma } from "~/db/prisma.server";

interface GetCharactersOptions {
  lang?: string;
}

export const getCharactersList = async (opts?: GetCharactersOptions) => {
  return await prisma.genshinCharacter.findMany({
    where: {
      identity: {
        every: {
          lang: opts?.lang,
        },
      },
    },
    select: {
      id: true,
      rarity: true,
      vision: true,
      weapon: true,
      identity: {
        select: {
          lang: true,
          name: true,
        },
      },
    },
  });
};

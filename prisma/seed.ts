import { Prisma, PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

import { charactersArray } from "./data/characters";

const prisma = new PrismaClient();

async function seed() {
  const name = "testuser";

  // cleanup the existing database
  await prisma.user.delete({ where: { name } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const hashedPassword = await bcrypt.hash("1234567890", 10);

  await prisma.user.create({
    data: {
      name,
      roles: {
        create: {
          title: "DEFAULT",
        },
      },
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });

  charactersArray.forEach(async (character) => {
    await prisma.character
      .create({
        data: {
          id: character.id,
          accentColor: parseInt(character.accentColor.substring(1), 16),
          birthDay: character.birthday[0],
          birthMonth: character.birthday[1],
          rarity: character.rarity,
          element: character.vision,
          weapon: character.weapon,
          info: {
            create: {
              entryLanguage: "en",
              name: character.name,
              description: character.description,
            },
          },
        },
      })
      .catch((e) => {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          console.log(`Error ${e.code} while isnerting ${character.id} data`);
        }
      });
  });

  console.log("Database has been seeded. 🌱");
}

seed()
  .catch(async (e) => {
    await prisma.$disconnect();
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

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
          role: "DEFAULT",
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
    await prisma.genshinCharacter
      .create({
        data: {
          id: character.id,
          accentColor: character.accentColor,
          birthDay: character.birthday[0],
          birthMonth: character.birthday[1],
          rarity: character.rarity,
          vision: character.vision,
          weapon: character.weapon,
          identity: {
            create: {
              lang: "en",
              id: character.id,
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
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

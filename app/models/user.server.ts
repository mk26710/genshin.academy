import type { Password, User } from "@prisma/client";

import { Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";

import { prisma } from "~/db/prisma.server";

export const includedWithUser = Prisma.validator<Prisma.UserInclude>()({
  roles: {
    orderBy: {
      title: "asc",
    },
    select: {
      title: true,
    },
  },
});

export const getUserById = async (id: User["id"]) => {
  return prisma.user.findUnique({
    where: { id },
    include: includedWithUser,
  });
};

export const getUserByName = async (name: User["name"]) => {
  return prisma.user.findUnique({
    where: { name },
    include: includedWithUser,
  });
};

export const getUserByNameOrId = async (nameOrId: string) =>
  await prisma.user.findFirst({
    where: {
      OR: [{ id: nameOrId }, { name: nameOrId }],
    },
    include: includedWithUser,
  });

export const createUser = async (name: User["name"], password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return prisma.user.create({
    data: {
      name,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
      roles: {
        create: {
          title: "DEFAULT",
        },
      },
    },
  });
};

export const deleteUserById = async (id: User["id"]) => {
  return await prisma.user.delete({ where: { id } });
};

export const deleteUserByName = async (name: User["name"]) => {
  return await prisma.user.delete({ where: { name } });
};

export const verifyLogin = async (name: User["name"], password: Password["hash"]) => {
  const userWithPassword = await prisma.user.findUnique({
    where: { name },
    include: {
      password: true,
    },
  });

  if (!userWithPassword || !userWithPassword.password) {
    return null;
  }

  const isValid = await bcrypt.compare(password, userWithPassword.password.hash);

  if (!isValid) {
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _password, ...userWithoutPassword } = userWithPassword;

  return userWithoutPassword;
};

export const changePasswordOfUser = async (userId: User["id"], newPassword: string) => {
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await prisma.password.update({
    where: { userId },
    data: {
      hash: hashedPassword,
    },
  });

  return true;
};

type UpdateUserOptions = {
  name?: User["name"];
  avatarUrl?: User["avatarUrl"];
  enabled?: User["enabled"];
  updatedAt: User["updatedAt"];
};

export const updateUserById = async (id: string, opts?: UpdateUserOptions) => {
  return await prisma.user.updateMany({
    where: { id },
    data: {
      name: opts?.name,
      enabled: opts?.enabled,
      avatarUrl: opts?.avatarUrl,
      updatedAt: opts?.updatedAt,
    },
  });
};

type LinkDiscordAccountOptions = {
  id: string;
  name?: string;
};

export const linkDiscordAccountByUserId = async (id: string, options: LinkDiscordAccountOptions) =>
  prisma.linkedAccounts.create({
    data: {
      userId: id,
      provider: "discord",
      providerAccountId: options.id,
      providerAccountName: options.name,
    },
  });

export const unlinkDiscordAccountByUserId = async (id: string) =>
  prisma.linkedAccounts.deleteMany({
    where: {
      userId: id,
      provider: "discord",
    },
  });

export const getUserByDiscordAccount = async (discordUserId: string) =>
  prisma.user.findFirst({
    where: {
      linkedAccounts: {
        some: {
          providerAccountId: discordUserId,
        },
      },
    },
    include: includedWithUser,
  });

export const getLinkedAccountsById = async (id: string) =>
  prisma.linkedAccounts.findMany({
    where: {
      userId: id,
    },
  });

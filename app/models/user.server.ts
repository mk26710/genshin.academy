import type { Password, User } from "#prisma/client";

import bcrypt from "bcryptjs";

import { prisma } from "~/db/prisma.server";

export const getUserById = async (id: User["id"]) => {
  return prisma.user.findUnique({
    where: { id },
    include: {
      roles: {
        orderBy: {
          title: "asc",
        },
        select: {
          title: true,
        },
      },
    },
  });
};

export const getUserByName = async (name: User["name"]) => {
  return prisma.user.findUnique({
    where: { name },
    include: {
      roles: {
        orderBy: {
          title: "asc",
        },
        select: {
          title: true,
        },
      },
    },
  });
};

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

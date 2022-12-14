/*
  Warnings:

  - The `uploaderId` column on the `File` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `FileTag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `FileTag` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `GenshinCharacter` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `accentColor` on the `GenshinCharacter` table. All the data in the column will be lost.
  - You are about to drop the column `vision` on the `GenshinCharacter` table. All the data in the column will be lost.
  - You are about to drop the column `characterId` on the `GenshinCharacterAsset` table. All the data in the column will be lost.
  - The `type` column on the `GenshinCharacterAsset` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `LinkedAccounts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `LinkedAccounts` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `providerId` column on the `Permissions` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Post` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Post` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `authorId` column on the `Post` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `editorId` column on the `Post` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `PostContent` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `PostContent` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `UserFlairs` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `UserFlairs` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `userId` column on the `UserFlairs` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `GenshinCharacterConstellations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GenshinCharacterIdentity` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[character_id,type]` on the table `GenshinCharacterAsset` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `accent_color` to the `GenshinCharacter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `character_id` to the `GenshinCharacterAsset` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `userId` on the `LinkedAccounts` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `userId` on the `Password` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `userId` on the `Permissions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `postId` on the `PostContent` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `userId` on the `UserRoles` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "citext";

-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- CreateEnum
CREATE TYPE "GenshinElement" AS ENUM ('PYRO', 'HYDRO', 'ELECTRO', 'CRYO', 'DENDRO', 'ANEMO', 'GEO');

-- CreateEnum
CREATE TYPE "TeyvatAssociation" AS ENUM ('LIYUE');

-- CreateEnum
CREATE TYPE "GenshinCharacterAssetType" AS ENUM ('ICON', 'CARD', 'GACHA', 'INGAME', 'UNKNOWN');

-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_uploaderId_fkey";

-- DropForeignKey
ALTER TABLE "GenshinCharacterAsset" DROP CONSTRAINT "GenshinCharacterAsset_characterId_fkey";

-- DropForeignKey
ALTER TABLE "GenshinCharacterConstellations" DROP CONSTRAINT "GenshinCharacterConstellations_genshinCharacterId_fkey";

-- DropForeignKey
ALTER TABLE "GenshinCharacterIdentity" DROP CONSTRAINT "GenshinCharacterIdentity_genshinCharacterId_fkey";

-- DropForeignKey
ALTER TABLE "LinkedAccounts" DROP CONSTRAINT "LinkedAccounts_userId_fkey";

-- DropForeignKey
ALTER TABLE "Password" DROP CONSTRAINT "Password_userId_fkey";

-- DropForeignKey
ALTER TABLE "Permissions" DROP CONSTRAINT "Permissions_providerId_fkey";

-- DropForeignKey
ALTER TABLE "Permissions" DROP CONSTRAINT "Permissions_userId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_editorId_fkey";

-- DropForeignKey
ALTER TABLE "PostContent" DROP CONSTRAINT "PostContent_postId_fkey";

-- DropForeignKey
ALTER TABLE "UserFlairs" DROP CONSTRAINT "UserFlairs_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserRoles" DROP CONSTRAINT "UserRoles_userId_fkey";

-- DropIndex
DROP INDEX "GenshinCharacterAsset_characterId_type_key";

-- AlterTable
ALTER TABLE "File" DROP COLUMN "uploaderId",
ADD COLUMN     "uploaderId" UUID;

-- AlterTable
ALTER TABLE "FileTag" DROP CONSTRAINT "FileTag_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD CONSTRAINT "FileTag_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "GenshinCharacter" DROP CONSTRAINT "GenshinCharacter_pkey",
DROP COLUMN "accentColor",
DROP COLUMN "vision",
ADD COLUMN     "accent_color" INTEGER NOT NULL,
ADD COLUMN     "association" "TeyvatAssociation",
ADD COLUMN     "element" "GenshinElement",
ADD COLUMN     "has_vision" BOOLEAN,
ALTER COLUMN "id" SET DATA TYPE CITEXT,
ALTER COLUMN "birthDay" DROP NOT NULL,
ALTER COLUMN "birthMonth" DROP NOT NULL,
ADD CONSTRAINT "GenshinCharacter_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "GenshinCharacterAsset" DROP COLUMN "characterId",
ADD COLUMN     "character_id" CITEXT NOT NULL,
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
DROP COLUMN "type",
ADD COLUMN     "type" "GenshinCharacterAssetType" NOT NULL DEFAULT 'UNKNOWN',
ADD CONSTRAINT "GenshinCharacterAsset_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "LinkedAccounts" DROP CONSTRAINT "LinkedAccounts_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
DROP COLUMN "userId",
ADD COLUMN     "userId" UUID NOT NULL,
ADD CONSTRAINT "LinkedAccounts_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Password" DROP COLUMN "userId",
ADD COLUMN     "userId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "Permissions" DROP COLUMN "userId",
ADD COLUMN     "userId" UUID NOT NULL,
DROP COLUMN "providerId",
ADD COLUMN     "providerId" UUID;

-- AlterTable
ALTER TABLE "Post" DROP CONSTRAINT "Post_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
DROP COLUMN "authorId",
ADD COLUMN     "authorId" UUID,
DROP COLUMN "editorId",
ADD COLUMN     "editorId" UUID,
ADD CONSTRAINT "Post_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "PostContent" DROP CONSTRAINT "PostContent_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
DROP COLUMN "postId",
ADD COLUMN     "postId" UUID NOT NULL,
ADD CONSTRAINT "PostContent_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ALTER COLUMN "username" SET DATA TYPE CITEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "UserFlairs" DROP CONSTRAINT "UserFlairs_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
DROP COLUMN "userId",
ADD COLUMN     "userId" UUID,
ADD CONSTRAINT "UserFlairs_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "UserRoles" DROP COLUMN "userId",
ADD COLUMN     "userId" UUID NOT NULL;

-- DropTable
DROP TABLE "GenshinCharacterConstellations";

-- DropTable
DROP TABLE "GenshinCharacterIdentity";

-- DropEnum
DROP TYPE "CharacterAssetType";

-- DropEnum
DROP TYPE "GenshinVision";

-- CreateTable
CREATE TABLE "GenshinCharacterInfo" (
    "enrty_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "entryLanguage" VARCHAR(2) NOT NULL DEFAULT 'en',
    "character_id" CITEXT NOT NULL,
    "name" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,

    CONSTRAINT "GenshinCharacterInfo_pkey" PRIMARY KEY ("enrty_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GenshinCharacterInfo_entryLanguage_character_id_key" ON "GenshinCharacterInfo"("entryLanguage", "character_id");

-- CreateIndex
CREATE UNIQUE INDEX "GenshinCharacterAsset_character_id_type_key" ON "GenshinCharacterAsset"("character_id", "type");

-- CreateIndex
CREATE UNIQUE INDEX "LinkedAccounts_userId_provider_key" ON "LinkedAccounts"("userId", "provider");

-- CreateIndex
CREATE UNIQUE INDEX "Password_userId_key" ON "Password"("userId");

-- CreateIndex
CREATE INDEX "Permissions_providerId_idx" ON "Permissions"("providerId");

-- CreateIndex
CREATE UNIQUE INDEX "Permissions_userId_value_key" ON "Permissions"("userId", "value");

-- CreateIndex
CREATE UNIQUE INDEX "PostContent_postId_key" ON "PostContent"("postId");

-- CreateIndex
CREATE UNIQUE INDEX "UserFlairs_userId_key" ON "UserFlairs"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserRoles_userId_title_key" ON "UserRoles"("userId", "title");

-- AddForeignKey
ALTER TABLE "Password" ADD CONSTRAINT "Password_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LinkedAccounts" ADD CONSTRAINT "LinkedAccounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFlairs" ADD CONSTRAINT "UserFlairs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRoles" ADD CONSTRAINT "UserRoles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Permissions" ADD CONSTRAINT "Permissions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Permissions" ADD CONSTRAINT "Permissions_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_uploaderId_fkey" FOREIGN KEY ("uploaderId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_editorId_fkey" FOREIGN KEY ("editorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostContent" ADD CONSTRAINT "PostContent_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GenshinCharacterInfo" ADD CONSTRAINT "GenshinCharacterInfo_character_id_fkey" FOREIGN KEY ("character_id") REFERENCES "GenshinCharacter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GenshinCharacterAsset" ADD CONSTRAINT "GenshinCharacterAsset_character_id_fkey" FOREIGN KEY ("character_id") REFERENCES "GenshinCharacter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

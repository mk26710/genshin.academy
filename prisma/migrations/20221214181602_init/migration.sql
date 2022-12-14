-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "citext";

-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('OWNER', 'ADMIN', 'MODERATOR', 'DEVELOPER', 'WRITER', 'SUPPORTER', 'DEFAULT');

-- CreateEnum
CREATE TYPE "PermissionFlag" AS ENUM ('ABSOLUTE_POWER', 'EDIT_USER', 'DELETE_USER', 'NEW_POST', 'EDIT_MY_POST', 'EDIT_SOMEONES_POST', 'DELETE_MY_POST', 'DELETE_SOMEONES_POST', 'NEW_CHARACTER', 'EDIT_CHARACTER', 'DELETE_CHARACTER', 'NEW_ASSET', 'EDIT_MY_ASSET', 'EDIT_SOMEONES_ASSET', 'DELETE_MY_ASSET', 'DELETE_SOMEONES_ASSET', 'VIEW_ALL_ASSETS', 'DEFAULT');

-- CreateEnum
CREATE TYPE "PostType" AS ENUM ('CHARACTER_GUIDE', 'GENERAL_GUIDE', 'GENERAL');

-- CreateEnum
CREATE TYPE "PostStatus" AS ENUM ('PUBLISHED', 'AWAITING_APPROVAL', 'HIDDEN');

-- CreateEnum
CREATE TYPE "GenshinElement" AS ENUM ('PYRO', 'HYDRO', 'ELECTRO', 'CRYO', 'DENDRO', 'ANEMO', 'GEO');

-- CreateEnum
CREATE TYPE "GenshinWeapon" AS ENUM ('SWORD', 'CLAYMORE', 'BOW', 'CATALYST', 'POLEARM');

-- CreateEnum
CREATE TYPE "TeyvatAssociation" AS ENUM ('LIYUE');

-- CreateEnum
CREATE TYPE "GenshinCharacterAssetType" AS ENUM ('ICON', 'CARD', 'GACHA', 'INGAME', 'UNKNOWN');

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "username" CITEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT false,
    "avatarUrl" TEXT,
    "accentColor" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Password" (
    "userId" UUID NOT NULL,
    "hash" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "LinkedAccounts" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" UUID NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "providerAccountName" TEXT,
    "linkedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LinkedAccounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserFlairs" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" UUID,
    "text" TEXT,
    "bgColor" VARCHAR(7),
    "fgColor" VARCHAR(7),

    CONSTRAINT "UserFlairs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserRoles" (
    "userId" UUID NOT NULL,
    "title" "UserRole" NOT NULL DEFAULT 'DEFAULT'
);

-- CreateTable
CREATE TABLE "Permissions" (
    "userId" UUID NOT NULL,
    "providerId" UUID,
    "value" "PermissionFlag" NOT NULL DEFAULT 'DEFAULT',
    "grantedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "File" (
    "id" TEXT NOT NULL,
    "uploaderId" UUID,
    "s3Key" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sha256" TEXT,
    "originalSha256" TEXT,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FileTag" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "fileId" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "FileTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "slug" TEXT NOT NULL,
    "authorId" UUID,
    "type" "PostType" NOT NULL DEFAULT 'GENERAL',
    "status" "PostStatus" NOT NULL DEFAULT 'PUBLISHED',
    "publishedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "editedAt" TIMESTAMP(3),
    "editorId" UUID,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "tags" TEXT NOT NULL,
    "thumbnailUrl" TEXT,
    "lang" VARCHAR(2) NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostContent" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "postId" UUID NOT NULL,
    "raw" TEXT NOT NULL,

    CONSTRAINT "PostContent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GenshinCharacter" (
    "id" CITEXT NOT NULL,
    "accent_color" INTEGER NOT NULL,
    "birthDay" INTEGER,
    "birthMonth" INTEGER,
    "rarity" INTEGER NOT NULL,
    "element" "GenshinElement",
    "has_vision" BOOLEAN,
    "weapon" "GenshinWeapon" NOT NULL,
    "association" "TeyvatAssociation",

    CONSTRAINT "GenshinCharacter_pkey" PRIMARY KEY ("id")
);

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

-- CreateTable
CREATE TABLE "GenshinCharacterAsset" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "character_id" CITEXT NOT NULL,
    "type" "GenshinCharacterAssetType" NOT NULL DEFAULT 'UNKNOWN',
    "url" TEXT NOT NULL,

    CONSTRAINT "GenshinCharacterAsset_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Password_userId_key" ON "Password"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "LinkedAccounts_userId_provider_key" ON "LinkedAccounts"("userId", "provider");

-- CreateIndex
CREATE UNIQUE INDEX "UserFlairs_userId_key" ON "UserFlairs"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserRoles_userId_title_key" ON "UserRoles"("userId", "title");

-- CreateIndex
CREATE INDEX "Permissions_providerId_idx" ON "Permissions"("providerId");

-- CreateIndex
CREATE UNIQUE INDEX "Permissions_userId_value_key" ON "Permissions"("userId", "value");

-- CreateIndex
CREATE UNIQUE INDEX "File_sha256_key" ON "File"("sha256");

-- CreateIndex
CREATE UNIQUE INDEX "File_originalSha256_key" ON "File"("originalSha256");

-- CreateIndex
CREATE UNIQUE INDEX "FileTag_fileId_value_key" ON "FileTag"("fileId", "value");

-- CreateIndex
CREATE UNIQUE INDEX "Post_slug_key" ON "Post"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "PostContent_postId_key" ON "PostContent"("postId");

-- CreateIndex
CREATE UNIQUE INDEX "GenshinCharacterInfo_entryLanguage_character_id_key" ON "GenshinCharacterInfo"("entryLanguage", "character_id");

-- CreateIndex
CREATE UNIQUE INDEX "GenshinCharacterAsset_character_id_type_key" ON "GenshinCharacterAsset"("character_id", "type");

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
ALTER TABLE "FileTag" ADD CONSTRAINT "FileTag_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File"("id") ON DELETE CASCADE ON UPDATE CASCADE;

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

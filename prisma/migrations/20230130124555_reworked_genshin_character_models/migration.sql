/*
  Warnings:

  - You are about to drop the `GenshinCharacter` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GenshinCharacterAsset` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GenshinCharacterInfo` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "CharacterAssetType" AS ENUM ('ICON', 'AVATAR', 'CARD');

-- DropForeignKey
ALTER TABLE "GenshinCharacterAsset" DROP CONSTRAINT "GenshinCharacterAsset_character_id_fkey";

-- DropForeignKey
ALTER TABLE "GenshinCharacterInfo" DROP CONSTRAINT "GenshinCharacterInfo_character_id_fkey";

-- DropTable
DROP TABLE "GenshinCharacter";

-- DropTable
DROP TABLE "GenshinCharacterAsset";

-- DropTable
DROP TABLE "GenshinCharacterInfo";

-- DropEnum
DROP TYPE "GenshinCharacterAssetType";

-- CreateTable
CREATE TABLE "CharacterMeta" (
    "id" TEXT NOT NULL,
    "accent_color" TEXT NOT NULL,
    "rarity" SMALLINT NOT NULL,
    "element" "GenshinElement",
    "weapon" "GenshinWeapon",
    "has_vision" BOOLEAN,
    "is_archon" BOOLEAN,
    "association" "TeyvatAssociation",
    "birth_date" DATE,
    "release_date" DATE NOT NULL,
    "version_released" TEXT NOT NULL,

    CONSTRAINT "CharacterMeta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CharacterAsset" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "characterMetaId" TEXT,
    "type" "CharacterAssetType",
    "name" TEXT NOT NULL,
    "description" TEXT,
    "url" TEXT NOT NULL,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "CharacterAsset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CharacterEntry" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "meta_id" TEXT,
    "locale" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "affiliation" TEXT,
    "constellation" TEXT,

    CONSTRAINT "CharacterEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VoiceActor" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "lang" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "characterMetaId" TEXT,

    CONSTRAINT "VoiceActor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CharacterAsset_url_key" ON "CharacterAsset"("url");

-- CreateIndex
CREATE UNIQUE INDEX "CharacterEntry_meta_id_locale_key" ON "CharacterEntry"("meta_id", "locale");

-- AddForeignKey
ALTER TABLE "CharacterAsset" ADD CONSTRAINT "CharacterAsset_characterMetaId_fkey" FOREIGN KEY ("characterMetaId") REFERENCES "CharacterMeta"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterEntry" ADD CONSTRAINT "CharacterEntry_meta_id_fkey" FOREIGN KEY ("meta_id") REFERENCES "CharacterMeta"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VoiceActor" ADD CONSTRAINT "VoiceActor_characterMetaId_fkey" FOREIGN KEY ("characterMetaId") REFERENCES "CharacterMeta"("id") ON DELETE SET NULL ON UPDATE CASCADE;

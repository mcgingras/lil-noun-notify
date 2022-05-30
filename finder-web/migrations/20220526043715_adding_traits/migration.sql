/*
  Warnings:

  - A unique constraint covering the columns `[discordId]` on the table `Account` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "TraitType" AS ENUM ('HEAD', 'BODY', 'GLASSES', 'ACCESSORY');

-- CreateTable
CREATE TABLE "Trait" (
    "id" SERIAL NOT NULL,
    "localId" INTEGER NOT NULL,
    "type" "TraitType" NOT NULL,
    "svg" TEXT NOT NULL,

    CONSTRAINT "Trait_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_discordId_key" ON "Account"("discordId");

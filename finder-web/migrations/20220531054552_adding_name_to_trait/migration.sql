/*
  Warnings:

  - Added the required column `name` to the `Trait` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Trait" ADD COLUMN     "name" TEXT NOT NULL;

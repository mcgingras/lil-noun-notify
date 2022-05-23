/*
  Warnings:

  - You are about to drop the `AccountSavedSeed` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AccountSavedSeed" DROP CONSTRAINT "AccountSavedSeed_accountId_fkey";

-- DropForeignKey
ALTER TABLE "AccountSavedSeed" DROP CONSTRAINT "AccountSavedSeed_savedSeedId_fkey";

-- DropTable
DROP TABLE "AccountSavedSeed";

-- CreateTable
CREATE TABLE "_AccountToSavedSeed" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AccountToSavedSeed_AB_unique" ON "_AccountToSavedSeed"("A", "B");

-- CreateIndex
CREATE INDEX "_AccountToSavedSeed_B_index" ON "_AccountToSavedSeed"("B");

-- AddForeignKey
ALTER TABLE "_AccountToSavedSeed" ADD CONSTRAINT "_AccountToSavedSeed_A_fkey" FOREIGN KEY ("A") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AccountToSavedSeed" ADD CONSTRAINT "_AccountToSavedSeed_B_fkey" FOREIGN KEY ("B") REFERENCES "SavedSeed"("id") ON DELETE CASCADE ON UPDATE CASCADE;

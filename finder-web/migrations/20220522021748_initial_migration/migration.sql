-- CreateTable
CREATE TABLE "Account" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AccountSavedSeed" (
    "accountId" INTEGER NOT NULL,
    "savedSeedId" INTEGER NOT NULL,

    CONSTRAINT "AccountSavedSeed_pkey" PRIMARY KEY ("accountId","savedSeedId")
);

-- CreateTable
CREATE TABLE "SavedSeed" (
    "id" INTEGER NOT NULL,
    "head" INTEGER NOT NULL,
    "body" INTEGER NOT NULL,
    "glasses" INTEGER NOT NULL,
    "accessory" INTEGER NOT NULL,

    CONSTRAINT "SavedSeed_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AccountSavedSeed" ADD CONSTRAINT "AccountSavedSeed_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccountSavedSeed" ADD CONSTRAINT "AccountSavedSeed_savedSeedId_fkey" FOREIGN KEY ("savedSeedId") REFERENCES "SavedSeed"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

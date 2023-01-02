/*
  Warnings:

  - You are about to drop the `PasskeyAuthenticators` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PasskeyAuthenticators" DROP CONSTRAINT "PasskeyAuthenticators_userId_fkey";

-- DropTable
DROP TABLE "PasskeyAuthenticators";

-- CreateTable
CREATE TABLE "PasskeyLoginChallenge" (
    "id" SERIAL NOT NULL,
    "challenge" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "PasskeyLoginChallenge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PasskeyAuthenticator" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "counter" INTEGER NOT NULL,
    "credentialID" BYTEA NOT NULL,
    "credentialPublicKey" BYTEA NOT NULL,

    CONSTRAINT "PasskeyAuthenticator_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PasskeyLoginChallenge_challenge_key" ON "PasskeyLoginChallenge"("challenge");

-- AddForeignKey
ALTER TABLE "PasskeyLoginChallenge" ADD CONSTRAINT "PasskeyLoginChallenge_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PasskeyAuthenticator" ADD CONSTRAINT "PasskeyAuthenticator_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

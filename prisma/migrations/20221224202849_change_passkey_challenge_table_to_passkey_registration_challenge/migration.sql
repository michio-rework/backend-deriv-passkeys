/*
  Warnings:

  - You are about to drop the `PasskeyChallenge` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PasskeyChallenge" DROP CONSTRAINT "PasskeyChallenge_userId_fkey";

-- DropTable
DROP TABLE "PasskeyChallenge";

-- CreateTable
CREATE TABLE "PasskeyRegistrationChallenge" (
    "id" SERIAL NOT NULL,
    "challenge" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "PasskeyRegistrationChallenge_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PasskeyRegistrationChallenge_challenge_key" ON "PasskeyRegistrationChallenge"("challenge");

-- AddForeignKey
ALTER TABLE "PasskeyRegistrationChallenge" ADD CONSTRAINT "PasskeyRegistrationChallenge_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

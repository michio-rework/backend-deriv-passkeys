/*
  Warnings:

  - You are about to drop the `PasskeyChallenges` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "challenge_id" INTEGER;

-- DropTable
DROP TABLE "PasskeyChallenges";

-- CreateTable
CREATE TABLE "PasskeyChallenge" (
    "id" SERIAL NOT NULL,
    "challenge" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PasskeyChallenge_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PasskeyChallenge_challenge_key" ON "PasskeyChallenge"("challenge");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_challenge_id_fkey" FOREIGN KEY ("challenge_id") REFERENCES "PasskeyChallenge"("id") ON DELETE SET NULL ON UPDATE CASCADE;

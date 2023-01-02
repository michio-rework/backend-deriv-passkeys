/*
  Warnings:

  - You are about to drop the column `challenge_id` on the `User` table. All the data in the column will be lost.
  - Added the required column `userId` to the `PasskeyChallenge` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_challenge_id_fkey";

-- AlterTable
ALTER TABLE "PasskeyChallenge" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "challenge_id";

-- AddForeignKey
ALTER TABLE "PasskeyChallenge" ADD CONSTRAINT "PasskeyChallenge_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

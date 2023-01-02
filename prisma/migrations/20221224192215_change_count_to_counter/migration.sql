/*
  Warnings:

  - You are about to drop the column `count` on the `PasskeyAuthenticators` table. All the data in the column will be lost.
  - Added the required column `counter` to the `PasskeyAuthenticators` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PasskeyAuthenticators" DROP COLUMN "count",
ADD COLUMN     "counter" INTEGER NOT NULL;

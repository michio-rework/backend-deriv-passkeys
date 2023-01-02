/*
  Warnings:

  - You are about to drop the column `aaguid` on the `PasskeyAuthenticators` table. All the data in the column will be lost.
  - You are about to drop the column `attestationObject` on the `PasskeyAuthenticators` table. All the data in the column will be lost.
  - You are about to drop the column `authenticatorExtensionResults` on the `PasskeyAuthenticators` table. All the data in the column will be lost.
  - You are about to drop the column `credentialBackedUp` on the `PasskeyAuthenticators` table. All the data in the column will be lost.
  - You are about to drop the column `credentialDeviceType` on the `PasskeyAuthenticators` table. All the data in the column will be lost.
  - You are about to drop the column `credentialType` on the `PasskeyAuthenticators` table. All the data in the column will be lost.
  - You are about to drop the column `fmt` on the `PasskeyAuthenticators` table. All the data in the column will be lost.
  - You are about to drop the column `userVerified` on the `PasskeyAuthenticators` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PasskeyAuthenticators" DROP COLUMN "aaguid",
DROP COLUMN "attestationObject",
DROP COLUMN "authenticatorExtensionResults",
DROP COLUMN "credentialBackedUp",
DROP COLUMN "credentialDeviceType",
DROP COLUMN "credentialType",
DROP COLUMN "fmt",
DROP COLUMN "userVerified";

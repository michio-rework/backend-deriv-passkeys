/*
  Warnings:

  - Added the required column `attestationFormat` to the `PasskeyAuthenticator` table without a default value. This is not possible if the table is not empty.
  - Added the required column `credentialDeviceType` to the `PasskeyAuthenticator` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PasskeyAuthenticator" ADD COLUMN     "attestationFormat" BYTEA NOT NULL,
ADD COLUMN     "credentialDeviceType" BYTEA NOT NULL;

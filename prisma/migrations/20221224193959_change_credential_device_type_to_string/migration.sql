/*
  Warnings:

  - The `credentialDeviceType` column on the `PasskeyAuthenticators` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "PasskeyAuthenticators" DROP COLUMN "credentialDeviceType",
ADD COLUMN     "credentialDeviceType" TEXT NOT NULL DEFAULT 'singleDevice';

-- DropEnum
DROP TYPE "CredentialDeviceType";

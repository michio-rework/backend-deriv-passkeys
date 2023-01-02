/*
  Warnings:

  - The `fmt` column on the `PasskeyAuthenticators` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "PasskeyAuthenticators" DROP COLUMN "fmt",
ADD COLUMN     "fmt" TEXT DEFAULT 'none';

-- DropEnum
DROP TYPE "AttestationFormat";

-- CreateEnum
CREATE TYPE "AttestationFormat" AS ENUM ('fido-u2f', 'packed', 'android-safetynet', 'android-key', 'tpm', 'apple', 'none');

-- CreateEnum
CREATE TYPE "CredentialDeviceType" AS ENUM ('singleDevice', 'multiDevice');

-- CreateTable
CREATE TABLE "PasskeyAuthenticators" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "fmt" "AttestationFormat" NOT NULL DEFAULT 'none',
    "count" INTEGER NOT NULL,
    "aaguid" TEXT NOT NULL,
    "credentialID" BYTEA NOT NULL,
    "credentialPublicKey" BYTEA NOT NULL,
    "credentialType" TEXT NOT NULL DEFAULT 'public-key',
    "attestationObject" BYTEA NOT NULL,
    "userVerified" BOOLEAN NOT NULL,
    "credentialDeviceType" "CredentialDeviceType" NOT NULL,
    "credentialBackedUp" BOOLEAN NOT NULL,
    "authenticatorExtensionResults" JSONB NOT NULL,

    CONSTRAINT "PasskeyAuthenticators_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PasskeyAuthenticators" ADD CONSTRAINT "PasskeyAuthenticators_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

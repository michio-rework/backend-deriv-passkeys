-- CreateTable
CREATE TABLE "PasskeyChallenges" (
    "id" SERIAL NOT NULL,
    "challenge" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PasskeyChallenges_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PasskeyChallenges_challenge_key" ON "PasskeyChallenges"("challenge");

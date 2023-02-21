/*
  Warnings:

  - A unique constraint covering the columns `[userName]` on the table `Score` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "Letters" (
    "letter" TEXT[],
    "id" SERIAL NOT NULL,

    CONSTRAINT "Letters_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Score_userName_key" ON "Score"("userName");

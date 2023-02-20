/*
  Warnings:

  - You are about to drop the column `userId` on the `Score` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `User` to the `Score` table without a default value. This is not possible if the table is not empty.
  - Added the required column `score` to the `Score` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Score" DROP CONSTRAINT "Score_userId_fkey";

-- AlterTable
ALTER TABLE "Score" DROP COLUMN "userId",
ADD COLUMN     "User" TEXT NOT NULL,
ADD COLUMN     "score" INTEGER NOT NULL;

-- DropTable
DROP TABLE "User";

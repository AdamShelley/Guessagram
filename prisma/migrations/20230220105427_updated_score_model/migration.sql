/*
  Warnings:

  - You are about to drop the column `User` on the `Score` table. All the data in the column will be lost.
  - Added the required column `userName` to the `Score` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Score" DROP COLUMN "User",
ADD COLUMN     "userName" TEXT NOT NULL;

/*
  Warnings:

  - You are about to drop the column `Episodes` on the `ContinueWatching` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ContinueWatching" DROP COLUMN "Episodes",
ADD COLUMN     "episode" TEXT;

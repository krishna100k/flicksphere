/*
  Warnings:

  - You are about to drop the column `movieName` on the `ContinueWatching` table. All the data in the column will be lost.
  - Added the required column `contentName` to the `ContinueWatching` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ContinueWatching" DROP COLUMN "movieName",
ADD COLUMN     "contentName" TEXT NOT NULL;

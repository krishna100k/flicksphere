/*
  Warnings:

  - Added the required column `imageUrl` to the `ContinueWatching` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ContinueWatching" ADD COLUMN     "imageUrl" TEXT NOT NULL;

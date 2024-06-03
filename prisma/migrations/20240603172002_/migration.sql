/*
  Warnings:

  - You are about to drop the column `passwords` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "passwords",
ADD COLUMN     "password" TEXT;

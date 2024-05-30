-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "fullname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "profilepic" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

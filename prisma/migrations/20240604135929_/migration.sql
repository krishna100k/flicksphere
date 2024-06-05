-- CreateTable
CREATE TABLE "ContinueWatching" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "movieId" TEXT NOT NULL,
    "movieName" TEXT NOT NULL,
    "category" TEXT NOT NULL,

    CONSTRAINT "ContinueWatching_pkey" PRIMARY KEY ("id")
);

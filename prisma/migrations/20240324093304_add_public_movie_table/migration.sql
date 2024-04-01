-- CreateTable
CREATE TABLE "PublicMovie" (
    "id" SERIAL NOT NULL,
    "publicationDate" DATE,
    "title" TEXT NOT NULL,
    "siteURL" TEXT,
    "image" TEXT,

    CONSTRAINT "PublicMovie_pkey" PRIMARY KEY ("id")
);

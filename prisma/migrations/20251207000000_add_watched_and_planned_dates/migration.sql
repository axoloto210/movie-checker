-- AlterTable
ALTER TABLE "Movie" ADD COLUMN "watchedDate" DATE;

-- AlterTable
ALTER TABLE "Movie" ADD COLUMN "plannedDate" DATE;

-- DataMigration
-- Set watchedDate to createdAt (converted to JST) for movies that have been watched
-- Convert UTC timestamp to JST (Asia/Tokyo) timezone before extracting the date
UPDATE "Movie"
SET "watchedDate" = ("createdAt" AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Tokyo')::DATE
WHERE "watched" = true;

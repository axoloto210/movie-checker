-- DataMigration
-- Convert existing UTC timestamps to JST timestamps
-- This is a one-time migration to convert all existing data from UTC to JST
-- IMPORTANT: This is a destructive operation. Backup your data before running this migration.

-- Convert Movie table timestamps from UTC to JST
UPDATE "Movie"
SET
  "createdAt" = "createdAt" AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Tokyo',
  "updatedAt" = "updatedAt" AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Tokyo';

-- Convert User table timestamps from UTC to JST (if exists)
UPDATE "User"
SET
  "emailVerified" = "emailVerified" AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Tokyo'
WHERE "emailVerified" IS NOT NULL;

-- Convert Session table timestamps from UTC to JST (if exists)
UPDATE "Session"
SET
  "expires" = "expires" AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Tokyo';

-- Convert VerificationToken table timestamps from UTC to JST (if exists)
UPDATE "VerificationToken"
SET
  "expires" = "expires" AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Tokyo';

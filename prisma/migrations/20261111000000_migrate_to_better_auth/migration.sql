-- DataMigration
-- Auth.js (next-auth v4) のスキーマから Better Auth のスキーマへ移行する。
-- 既存の User / Account は保持し、GitHub ログイン時に既存ユーザーへ紐づくようにする。
-- Session は Cookie 形式が非互換で再利用できないため削除する（全ユーザーが再ログインになる）。
-- IMPORTANT: 本番適用前にデータのバックアップを取得すること。

-- ========== User ==========
ALTER TABLE "User" ADD COLUMN "emailVerified_new" BOOLEAN NOT NULL DEFAULT false;
UPDATE "User" SET "emailVerified_new" = ("emailVerified" IS NOT NULL);
ALTER TABLE "User" DROP COLUMN "emailVerified";
ALTER TABLE "User" RENAME COLUMN "emailVerified_new" TO "emailVerified";

ALTER TABLE "User"
  ADD COLUMN "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  ADD COLUMN "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "User" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- ========== Account ==========
ALTER TABLE "Account" RENAME COLUMN "provider" TO "providerId";
ALTER TABLE "Account" RENAME COLUMN "providerAccountId" TO "accountId";
ALTER TABLE "Account" RENAME COLUMN "access_token" TO "accessToken";
ALTER TABLE "Account" RENAME COLUMN "refresh_token" TO "refreshToken";
ALTER TABLE "Account" RENAME COLUMN "id_token" TO "idToken";

-- expires_at (UNIX 秒) -> accessTokenExpiresAt (TIMESTAMP)
ALTER TABLE "Account" ADD COLUMN "accessTokenExpiresAt" TIMESTAMP(3);
UPDATE "Account"
SET "accessTokenExpiresAt" = to_timestamp("expires_at") AT TIME ZONE 'UTC'
WHERE "expires_at" IS NOT NULL;

ALTER TABLE "Account"
  DROP COLUMN "expires_at",
  DROP COLUMN "type",
  DROP COLUMN "token_type",
  DROP COLUMN "session_state",
  ADD COLUMN "refreshTokenExpiresAt" TIMESTAMP(3),
  ADD COLUMN "password" TEXT,
  ADD COLUMN "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  ADD COLUMN "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "Account" ALTER COLUMN "updatedAt" DROP DEFAULT;

ALTER INDEX "Account_provider_providerAccountId_key" RENAME TO "Account_providerId_accountId_key";
CREATE INDEX "Account_userId_idx" ON "Account"("userId");

-- ========== Session ==========
DELETE FROM "Session";

ALTER TABLE "Session" RENAME COLUMN "sessionToken" TO "token";
ALTER TABLE "Session" RENAME COLUMN "expires" TO "expiresAt";
ALTER TABLE "Session"
  ADD COLUMN "ipAddress" TEXT,
  ADD COLUMN "userAgent" TEXT,
  ADD COLUMN "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  ADD COLUMN "updatedAt" TIMESTAMP(3) NOT NULL;

ALTER INDEX "Session_sessionToken_key" RENAME TO "Session_token_key";
CREATE INDEX "Session_userId_idx" ON "Session"("userId");

-- ========== VerificationToken -> Verification ==========
-- GitHub ログインのみのため VerificationToken は未使用。作り直す。
DROP TABLE "VerificationToken";

CREATE TABLE "Verification" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Verification_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "Verification_identifier_idx" ON "Verification"("identifier");

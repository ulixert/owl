/*
  Warnings:

  - You are about to drop the column `originalPostId` on the `Repost` table. All the data in the column will be lost.
  - You are about to drop the column `originalUserId` on the `Repost` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Repost_originalPostId_idx";

-- DropIndex
DROP INDEX "Repost_originalUserId_idx";

-- AlterTable
ALTER TABLE "Repost" DROP COLUMN "originalPostId",
DROP COLUMN "originalUserId";

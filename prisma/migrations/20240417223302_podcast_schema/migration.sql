/*
  Warnings:

  - The primary key for the `Podcast` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `PodcastMembership` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[userId,email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `episodeNo` to the `Episode` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seasonNo` to the `Episode` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Episode` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Invitation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `author` to the `Podcast` table without a default value. This is not possible if the table is not empty.
  - Added the required column `copyright` to the `Podcast` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Podcast` table without a default value. This is not possible if the table is not empty.
  - Made the column `imageUrl` on table `Podcast` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `updatedAt` to the `PodcastMembership` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Role` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EpisodeStatus" AS ENUM ('Draft', 'Scheduled', 'Published');

-- DropForeignKey
ALTER TABLE "Episode" DROP CONSTRAINT "Episode_podcastId_fkey";

-- DropForeignKey
ALTER TABLE "Invitation" DROP CONSTRAINT "Invitation_podcastId_fkey";

-- DropForeignKey
ALTER TABLE "PodcastMembership" DROP CONSTRAINT "PodcastMembership_podcastId_fkey";

-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "Episode" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "episodeNo" TEXT NOT NULL,
ADD COLUMN     "pubDate" TIMESTAMP(3),
ADD COLUMN     "seasonNo" INTEGER NOT NULL,
ADD COLUMN     "status" "EpisodeStatus" NOT NULL DEFAULT 'Draft',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "podcastId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Invitation" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "podcastId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Podcast" DROP CONSTRAINT "Podcast_pkey",
ADD COLUMN     "Category" TEXT[],
ADD COLUMN     "author" TEXT NOT NULL,
ADD COLUMN     "copyright" TEXT NOT NULL,
ADD COLUMN     "country" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "explicit" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "website" TEXT,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "imageUrl" SET NOT NULL,
ADD CONSTRAINT "Podcast_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Podcast_id_seq";

-- AlterTable
ALTER TABLE "PodcastMembership" DROP CONSTRAINT "PodcastMembership_pkey",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "podcastId" SET DATA TYPE TEXT,
ADD CONSTRAINT "PodcastMembership_pkey" PRIMARY KEY ("podcastId", "userId");

-- AlterTable
ALTER TABLE "Role" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Enclosure" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "length" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "episodeId" INTEGER NOT NULL,

    CONSTRAINT "Enclosure_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Enclosure_episodeId_key" ON "Enclosure"("episodeId");

-- CreateIndex
CREATE UNIQUE INDEX "User_userId_email_key" ON "User"("userId", "email");

-- AddForeignKey
ALTER TABLE "PodcastMembership" ADD CONSTRAINT "PodcastMembership_podcastId_fkey" FOREIGN KEY ("podcastId") REFERENCES "Podcast"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Episode" ADD CONSTRAINT "Episode_podcastId_fkey" FOREIGN KEY ("podcastId") REFERENCES "Podcast"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enclosure" ADD CONSTRAINT "Enclosure_episodeId_fkey" FOREIGN KEY ("episodeId") REFERENCES "Episode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invitation" ADD CONSTRAINT "Invitation_podcastId_fkey" FOREIGN KEY ("podcastId") REFERENCES "Podcast"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

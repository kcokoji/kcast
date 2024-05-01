-- CreateEnum
CREATE TYPE "EpisodeStatus" AS ENUM ('Draft', 'Scheduled', 'Published');

-- CreateEnum
CREATE TYPE "EpisodeType" AS ENUM ('Full', 'Trailer', 'Bonus');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Admin', 'Editor', 'Viewer');

-- CreateTable
CREATE TABLE "Podcast" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "website" TEXT,
    "author" TEXT NOT NULL,
    "category" TEXT[],
    "copyright" TEXT NOT NULL,
    "userId" UUID NOT NULL,
    "explicit" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Podcast_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PodcastMembership" (
    "podcastId" TEXT NOT NULL,
    "userId" UUID NOT NULL,
    "role" "Role" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PodcastMembership_pkey" PRIMARY KEY ("podcastId","userId")
);

-- CreateTable
CREATE TABLE "Episode" (
    "id" SERIAL NOT NULL,
    "episodeNo" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "audioUrl" TEXT NOT NULL,
    "seasonNo" INTEGER NOT NULL,
    "status" "EpisodeStatus" NOT NULL DEFAULT 'Draft',
    "episodeType" "EpisodeType" NOT NULL DEFAULT 'Full',
    "pubDate" TIMESTAMP(3),
    "explicit" BOOLEAN NOT NULL DEFAULT false,
    "podcastId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Episode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Enclosure" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "length" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "episodeId" INTEGER NOT NULL,

    CONSTRAINT "Enclosure_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invitation" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "roleId" INTEGER NOT NULL,
    "accepted" BOOLEAN NOT NULL DEFAULT false,
    "userId" UUID NOT NULL,
    "podcastId" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Invitation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PodcastMembership_podcastId_userId_key" ON "PodcastMembership"("podcastId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Enclosure_episodeId_key" ON "Enclosure"("episodeId");

-- AddForeignKey
ALTER TABLE "PodcastMembership" ADD CONSTRAINT "PodcastMembership_podcastId_fkey" FOREIGN KEY ("podcastId") REFERENCES "Podcast"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Episode" ADD CONSTRAINT "Episode_podcastId_fkey" FOREIGN KEY ("podcastId") REFERENCES "Podcast"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enclosure" ADD CONSTRAINT "Enclosure_episodeId_fkey" FOREIGN KEY ("episodeId") REFERENCES "Episode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invitation" ADD CONSTRAINT "Invitation_podcastId_fkey" FOREIGN KEY ("podcastId") REFERENCES "Podcast"("id") ON DELETE CASCADE ON UPDATE CASCADE;

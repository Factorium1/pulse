/*
  Warnings:

  - You are about to drop the column `fixedAt` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `offsetMinutes` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `timingType` on the `Question` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[shortLabel]` on the table `Survey` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `order` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SurveyType" AS ENUM ('ONE_SHOT', 'MULTI_DAY');

-- CreateEnum
CREATE TYPE "SurveyStatus" AS ENUM ('PLANNED', 'ACTIVE', 'COMPLETED', 'ARCHIVED', 'PAUSED');

-- CreateEnum
CREATE TYPE "BlockScheduleType" AS ENUM ('FIXED_DATETIME', 'RELATIVE_TO_START', 'EVENT_TRIGGERED');

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "fixedAt",
DROP COLUMN "offsetMinutes",
DROP COLUMN "timingType",
ADD COLUMN     "blockId" TEXT,
ADD COLUMN     "isEventQuestion" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "order" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Survey" ADD COLUMN     "emoji" TEXT,
ADD COLUMN     "shortLabel" TEXT,
ADD COLUMN     "status" "SurveyStatus" NOT NULL DEFAULT 'PLANNED',
ADD COLUMN     "type" "SurveyType" NOT NULL DEFAULT 'ONE_SHOT';

-- DropEnum
DROP TYPE "QuestionTimingType";

-- CreateTable
CREATE TABLE "SurveyBlock" (
    "id" TEXT NOT NULL,
    "surveyId" TEXT NOT NULL,
    "index" INTEGER NOT NULL,
    "title" TEXT,
    "scheduleType" "BlockScheduleType" NOT NULL DEFAULT 'RELATIVE_TO_START',
    "fixedAt" TIMESTAMP(3),
    "dayOffset" INTEGER,
    "timeOfDayMinutes" INTEGER,
    "eventKey" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SurveyBlock_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Survey_shortLabel_key" ON "Survey"("shortLabel");

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_blockId_fkey" FOREIGN KEY ("blockId") REFERENCES "SurveyBlock"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SurveyBlock" ADD CONSTRAINT "SurveyBlock_surveyId_fkey" FOREIGN KEY ("surveyId") REFERENCES "Survey"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

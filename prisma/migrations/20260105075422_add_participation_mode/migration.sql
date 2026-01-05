-- CreateEnum
CREATE TYPE "ApplicationType" AS ENUM ('DIRECT', 'APPLICATION');

-- AlterTable
ALTER TABLE "Survey" ADD COLUMN     "application" "ApplicationType" NOT NULL DEFAULT 'DIRECT';

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "maxAnswers" INTEGER;

-- AlterTable
ALTER TABLE "Survey" ADD COLUMN     "audience" TEXT,
ADD COLUMN     "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "targetParticipants" INTEGER;

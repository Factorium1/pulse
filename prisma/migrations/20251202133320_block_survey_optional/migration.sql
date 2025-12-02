-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_blockId_fkey";

-- AlterTable
ALTER TABLE "Question" ALTER COLUMN "blockId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_blockId_fkey" FOREIGN KEY ("blockId") REFERENCES "SurveyBlock"("id") ON DELETE SET NULL ON UPDATE CASCADE;

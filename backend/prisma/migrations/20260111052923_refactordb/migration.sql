/*
  Warnings:

  - You are about to drop the column `languageCodeId` on the `Score` table. All the data in the column will be lost.
  - Made the column `value` on table `Score` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Score" DROP CONSTRAINT "Score_languageCodeId_fkey";

-- DropIndex
DROP INDEX "Score_languageCodeId_idx";

-- AlterTable
ALTER TABLE "Score" DROP COLUMN "languageCodeId",
ALTER COLUMN "value" SET NOT NULL;

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "languageCodeId" INTEGER;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_languageCodeId_fkey" FOREIGN KEY ("languageCodeId") REFERENCES "LanguageCode"("id") ON DELETE SET NULL ON UPDATE CASCADE;

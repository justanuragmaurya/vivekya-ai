/*
  Warnings:

  - You are about to drop the column `phone` on the `Applicants` table. All the data in the column will be lost.
  - You are about to drop the column `resume` on the `Applicants` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Applicants" DROP COLUMN "phone",
DROP COLUMN "resume",
ADD COLUMN     "areasToImprove" TEXT,
ADD COLUMN     "ratingOutOf5Stars" INTEGER,
ADD COLUMN     "score" TEXT;

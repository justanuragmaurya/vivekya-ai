/*
  Warnings:

  - You are about to drop the column `Applicants` on the `Jobs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Jobs" DROP COLUMN "Applicants";

-- CreateTable
CREATE TABLE "Applicants" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "coverLetter" TEXT,
    "resume" TEXT,
    "appliedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "jobId" TEXT,

    CONSTRAINT "Applicants_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Applicants" ADD CONSTRAINT "Applicants_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Jobs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

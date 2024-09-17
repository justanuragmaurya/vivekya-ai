-- CreateTable
CREATE TABLE "Jobs" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "requiredSkills" TEXT[],
    "experienceLevel" TEXT NOT NULL,
    "jobType" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "salary" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "companyWebsite" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "questions" TEXT[],
    "Applicants" TEXT[],

    CONSTRAINT "Jobs_pkey" PRIMARY KEY ("id")
);

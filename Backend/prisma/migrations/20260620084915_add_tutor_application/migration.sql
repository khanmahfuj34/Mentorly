-- CreateEnum
CREATE TYPE "public"."ApplicationStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- CreateTable
CREATE TABLE "public"."TutorApplication" (
    "id" TEXT NOT NULL,
    "tutorId" TEXT NOT NULL,
    "tuitionRequestId" TEXT NOT NULL,
    "coverLetter" TEXT,
    "status" "public"."ApplicationStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TutorApplication_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."TutorApplication" ADD CONSTRAINT "TutorApplication_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TutorApplication" ADD CONSTRAINT "TutorApplication_tuitionRequestId_fkey" FOREIGN KEY ("tuitionRequestId") REFERENCES "public"."TuitionRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

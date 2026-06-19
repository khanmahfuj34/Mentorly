-- AlterTable
ALTER TABLE "public"."TutorProfile" ADD COLUMN     "currentInstitution" TEXT,
ADD COLUMN     "demoClassOffered" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "medium" TEXT[],
ADD COLUMN     "phoneNumber" TEXT,
ADD COLUMN     "preferredClasses" TEXT[],
ADD COLUMN     "profilePhoto" TEXT,
ADD COLUMN     "rating" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "teachingStyle" TEXT,
ADD COLUMN     "totalReviews" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "public"."StudentProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "classLevel" TEXT,
    "schoolCollege" TEXT,
    "preferredSubjects" TEXT[],
    "district" TEXT,
    "area" TEXT,
    "guardianName" TEXT,
    "guardianPhone" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StudentProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StudentProfile_userId_key" ON "public"."StudentProfile"("userId");

-- AddForeignKey
ALTER TABLE "public"."StudentProfile" ADD CONSTRAINT "StudentProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

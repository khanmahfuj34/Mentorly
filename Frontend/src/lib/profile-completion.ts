import { IStudentProfile } from "@/src/types/student.types";

export interface ProfileCompletionResult {
  isComplete: boolean;
  percentage: number;
  missingFields: string[];
  sectionStatus: {
    academic: boolean;
    location: boolean;
    guardian: boolean;
  };
}

export function checkStudentProfileCompletion(
  profile?: Partial<IStudentProfile> | null
): ProfileCompletionResult {
  if (!profile) {
    return {
      isComplete: false,
      percentage: 0,
      missingFields: [
        "Class Level",
        "School / College",
        "District",
        "Area",
        "Guardian Name",
        "Guardian Phone",
      ],
      sectionStatus: {
        academic: false,
        location: false,
        guardian: false,
      },
    };
  }

  const missingFields: string[] = [];

  // 1. Academic Information (40%)
  const hasClassLevel = Boolean(profile.classLevel && profile.classLevel.trim().length > 0);
  const hasSchoolCollege = Boolean(profile.schoolCollege && profile.schoolCollege.trim().length > 0);
  if (!hasClassLevel) missingFields.push("Class Level");
  if (!hasSchoolCollege) missingFields.push("School / College");
  const academicComplete = hasClassLevel && hasSchoolCollege;

  // 2. Location Details (30%)
  const hasDistrict = Boolean(profile.district && profile.district.trim().length > 0);
  const hasArea = Boolean(profile.area && profile.area.trim().length > 0);
  if (!hasDistrict) missingFields.push("District");
  if (!hasArea) missingFields.push("Area");
  const locationComplete = hasDistrict && hasArea;

  // 3. Guardian Information (30%)
  const hasGuardianName = Boolean(profile.guardianName && profile.guardianName.trim().length > 0);
  const hasGuardianPhone = Boolean(profile.guardianPhone && profile.guardianPhone.trim().length > 0);
  if (!hasGuardianName) missingFields.push("Guardian Name");
  if (!hasGuardianPhone) missingFields.push("Guardian Phone");
  const guardianComplete = hasGuardianName && hasGuardianPhone;

  const percentage =
    (academicComplete ? 40 : 0) +
    (locationComplete ? 30 : 0) +
    (guardianComplete ? 30 : 0);

  const isComplete = percentage === 100;

  return {
    isComplete,
    percentage,
    missingFields,
    sectionStatus: {
      academic: academicComplete,
      location: locationComplete,
      guardian: guardianComplete,
    },
  };
}

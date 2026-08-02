export interface ITutorProfile {
  id?: string;
  userId?: string;
  bio?: string;
  profilePhoto?: string;
  phoneNumber?: string;
  university?: string;
  department?: string;
  currentInstitution?: string;
  teachingSubjects?: string[];
  preferredClasses?: string[];
  medium?: string[];
  experienceYears?: number;
  hourlyRate?: number;
  teachingStyle?: string;
  demoClassOffered?: boolean;
  district?: string;
  area?: string;
  isApproved?: boolean;
  rating?: number;
  totalReviews?: number;
  createdAt?: string;
  updatedAt?: string;
  user?: {
    id: string;
    name: string;
    email: string;
    role: string;
    isVerified: boolean;
    isBlocked: boolean;
  };
}

export interface ITutorProfileInput {
  bio?: string;
  profilePhoto?: string;
  phoneNumber?: string;
  university?: string;
  department?: string;
  currentInstitution?: string;
  teachingSubjects?: string[];
  preferredClasses?: string[];
  medium?: string[];
  experienceYears?: number;
  hourlyRate?: number;
  teachingStyle?: string;
  demoClassOffered?: boolean;
  district?: string;
  area?: string;
}

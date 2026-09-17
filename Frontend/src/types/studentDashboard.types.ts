import { IStudentProfile } from "./student.types";
import { ITutorProfile } from "./tutor";

export interface IDashboardStats {
  activePosts: number;
  applicationsReceived: number;
  acceptedApplications: number;
  activeBookings: number;
}

export interface IDashboardRecentPost {
  id: string;
  subject: string;
  classLevel: string;
  medium?: string;
  district: string;
  area: string;
  salary: number;
  daysPerWeek: number;
  status: "OPEN" | "ASSIGNED" | "COMPLETED" | "CANCELLED";
  createdAt: string;
  _count?: {
    TutorApplication: number;
  };
}

export interface IDashboardRecentApplication {
  id: string;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
  createdAt: string;
  coverLetter?: string;
  tutor?: {
    id: string;
    name: string;
    email: string;
    tutorProfile?: ITutorProfile;
  };
  tuitionRequest?: {
    id: string;
    subject: string;
    classLevel: string;
    salary: number;
  };
}

export interface IDashboardUpcomingBooking {
  id: string;
  status: "PENDING" | "ACTIVE" | "COMPLETED" | "CANCELLED";
  startDate?: string;
  endDate?: string;
  createdAt: string;
  tutor?: {
    id: string;
    name: string;
    email: string;
    tutorProfile?: ITutorProfile;
  };
  tuitionRequest?: {
    id: string;
    subject: string;
    classLevel: string;
    salary: number;
    district: string;
    area: string;
  };
}

export interface IStudentDashboardData {
  profile: IStudentProfile | null;
  profileCompletion: number;
  missingFields: string[];
  stats: IDashboardStats;
  recentPosts: IDashboardRecentPost[];
  recentApplications: IDashboardRecentApplication[];
  upcomingBooking: IDashboardUpcomingBooking | null;
  recommendedTutors: ITutorProfile[];
}

export interface IStudentDashboardResponse {
  success: boolean;
  message?: string;
  data: IStudentDashboardData;
}

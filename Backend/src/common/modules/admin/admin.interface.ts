export interface ITutorQueryFilters {
  searchTerm?: string;
  isApproved?: string;
  district?: string;
  area?: string;
  page?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface IDashboardStats {
  totalStudents: number;
  totalTutors: number;
  approvedTutors: number;
  pendingTutors: number;
  openTuitionRequests: number;
  activeBookings: number;
}

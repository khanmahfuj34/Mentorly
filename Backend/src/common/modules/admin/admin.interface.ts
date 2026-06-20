export interface ITutorQueryFilters {
  searchTerm?: string;
  isApproved?: string;
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
  totalTuitionRequests: number;
  openTuitionRequests: number;
  assignedTuitionRequests: number;
  totalBookings: number;
  activeBookings: number;
  completedBookings: number;
  totalReviews: number;
}

export interface IReviewCreateInput {
  bookingId: string;
  rating: number;
  comment?: string;
}

export interface IReviewFilterRequest {
  rating?: string;
  studentId?: string;
  tutorId?: string;
  page?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

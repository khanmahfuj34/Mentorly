import { ApplicationStatus } from "../types/application.types"

export interface IApplicationFilterParams {
  status?: ApplicationStatus
  searchTerm?: string
}

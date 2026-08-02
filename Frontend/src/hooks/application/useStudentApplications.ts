import { useState, useCallback } from "react"
import { getStudentApplications } from "../../services/application/application.service"
import { ITutorApplication } from "../../types/application.types"

export const useStudentApplications = () => {
  const [data, setData] = useState<Record<string, ITutorApplication[]>>({})
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({})
  const [errorStates, setErrorStates] = useState<Record<string, string | null>>({})

  const fetchApplicationsForRequest = useCallback(async (tuitionRequestId: string) => {
    try {
      setLoadingStates((prev) => ({ ...prev, [tuitionRequestId]: true }))
      setErrorStates((prev) => ({ ...prev, [tuitionRequestId]: null }))
      
      const res = await getStudentApplications(tuitionRequestId)
      if (res.success) {
        setData((prev) => ({ ...prev, [tuitionRequestId]: res.data }))
      }
    } catch (err: any) {
      setErrorStates((prev) => ({ 
        ...prev, 
        [tuitionRequestId]: err?.response?.data?.message || err?.message || "Failed to load applicants" 
      }))
    } finally {
      setLoadingStates((prev) => ({ ...prev, [tuitionRequestId]: false }))
    }
  }, [])

  return {
    data,
    loadingStates,
    errorStates,
    fetchForRequest: fetchApplicationsForRequest,
  }
}

import { useState, useEffect, useCallback } from "react"
import { getMyApplications } from "../../services/application/application.service"
import { ITutorApplication } from "../../types/application.types"

export const useTutorApplications = () => {
  const [data, setData] = useState<ITutorApplication[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchApplications = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)
      const res = await getMyApplications()
      if (res.success) {
        setData(res.data)
      } else {
        setError("Failed to load applications")
      }
    } catch (err: any) {
      setError(err?.message || "Failed to load applications")
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchApplications()
  }, [fetchApplications])

  return {
    data,
    isLoading,
    error,
    refetch: fetchApplications,
  }
}

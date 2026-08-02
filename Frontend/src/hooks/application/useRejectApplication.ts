import { useState } from "react"
import { toast } from "sonner"
import { rejectApplication } from "../../services/application/application.service"

export const useRejectApplication = () => {
  const [isMutating, setIsMutating] = useState(false)

  const mutate = async (id: string, onSuccess?: () => void) => {
    try {
      setIsMutating(true)
      const res = await rejectApplication(id)
      if (res.success) {
        toast.success(res.message || "Tutor application rejected successfully.")
        if (onSuccess) {
          onSuccess()
        }
      } else {
        toast.error(res.message || "Failed to reject application.")
      }
    } catch (err: any) {
      const errMsg = err?.response?.data?.message || err?.message || "An unexpected error occurred."
      toast.error(errMsg)
    } finally {
      setIsMutating(false)
    }
  }

  return {
    mutate,
    isMutating,
  }
}

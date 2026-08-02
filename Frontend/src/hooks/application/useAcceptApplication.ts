import { useState } from "react"
import { toast } from "sonner"
import { acceptApplication } from "../../services/application/application.service"

export const useAcceptApplication = () => {
  const [isMutating, setIsMutating] = useState(false)

  const mutate = async (id: string, onSuccess?: () => void) => {
    try {
      setIsMutating(true)
      const res = await acceptApplication(id)
      if (res.success) {
        toast.success(res.message || "Tutor application accepted and booking created successfully.")
        if (onSuccess) {
          onSuccess()
        }
      } else {
        toast.error(res.message || "Failed to accept application.")
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

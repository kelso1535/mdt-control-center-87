
// Simplified toast hook for MDT
import { useState, useEffect, useRef } from "react"

type ToastProps = {
  id: string
  title?: string
  description?: string
  action?: React.ReactNode
  variant?: "default" | "destructive"
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastProps[]>([])

  const toast = (props: Omit<ToastProps, "id">) => {
    const id = Math.random().toString(36).substring(2, 9)
    setToasts((toasts) => [...toasts, { id, ...props }])
    
    return {
      id,
      dismiss: () => setToasts((toasts) => toasts.filter((t) => t.id !== id)),
      update: (props: Omit<ToastProps, "id">) => 
        setToasts((toasts) => 
          toasts.map((t) => (t.id === id ? { ...t, ...props } : t))
        ),
    }
  }

  const dismiss = (toastId?: string) => {
    setToasts((toasts) => 
      toastId ? toasts.filter((t) => t.id !== toastId) : []
    )
  }

  return {
    toast,
    dismiss,
    toasts,
  }
}

import type { ReactNode } from "react"
import { createContext, useCallback, useContext, useMemo, useState } from "react"
import Box from "@mui/material/Box"
import Notification from "./Notification"
import type { NotificationConfig, NotificationContextType } from "../../types/notifications"

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export const useNotifications = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error("useNotifications must be used within a NotificationProvider")
  }
  return context
}

let notificationCounter = 0

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<NotificationConfig[]>([])

  const addNotification = useCallback((notification: Omit<NotificationConfig, "id">) => {
    notificationCounter += 1
    const id = `notification-${Date.now()}-${notificationCounter}`
    setNotifications((prev) => [...prev, { ...notification, id }])
    return id
  }, [])

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }, [])

  const clearAllNotifications = useCallback(() => {
    setNotifications([])
  }, [])

  const value = useMemo(
    () => ({ notifications, addNotification, removeNotification, clearAllNotifications }),
    [notifications, addNotification, removeNotification, clearAllNotifications],
  )

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <Box sx={{ position: "fixed", top: 16, right: 16, zIndex: (theme) => theme.zIndex.tooltip + 1 }}>
        {notifications.map((notification) => (
          <Notification key={notification.id} notification={notification} onRemove={removeNotification} />
        ))}
      </Box>
    </NotificationContext.Provider>
  )
}

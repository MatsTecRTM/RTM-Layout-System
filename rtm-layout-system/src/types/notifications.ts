// Types for notifications and popups (portiert aus rtm-layout-v2)
import type { ReactNode } from "react"

export type NotificationType = "success" | "error" | "warning" | "info"

export interface NotificationAction {
  label: string
  onClick: () => void
  variant?: "contained" | "outlined" | "text"
}

export interface NotificationLink {
  label: string
  url: string
  external?: boolean
  onClick?: () => void
}

export interface NotificationPopup {
  title: string
  content: ReactNode | string
  maxWidth?: number
  onOpen?: () => void
  onClose?: () => void
}

export type PopupSize = "small" | "medium" | "large" | "fullscreen"

export interface PopupAction {
  label: string
  onClick: () => void
  variant?: "contained" | "outlined" | "text"
  color?: "primary" | "secondary" | "error" | "warning" | "info" | "success"
}

export interface PopupConfig {
  title?: string
  content: ReactNode | string
  size?: PopupSize
  showHeader?: boolean
  showCloseButton?: boolean
  showMaximizeButton?: boolean
  maxWidth?: number
  onOpen?: () => void
  onClose?: () => void
  onMaximize?: () => void
  onRestore?: () => void
  actions?: PopupAction[]
}

export interface NotificationConfig {
  id: string
  type: NotificationType
  title: string
  message: string
  autoHide?: boolean
  duration?: number
  icon?: ReactNode
  onClose?: () => void
  actions?: NotificationAction[]
  link?: NotificationLink
  popup?: NotificationPopup
}

export interface NotificationContextType {
  notifications: NotificationConfig[]
  addNotification: (notification: Omit<NotificationConfig, "id">) => string
  removeNotification: (id: string) => void
  clearAllNotifications: () => void
}

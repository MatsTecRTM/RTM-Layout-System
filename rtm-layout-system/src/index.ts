// Layout Components
export { default as LayoutShell } from './components/layout/LayoutShell'
export type { LayoutShellProps, LayoutMenuItem, LayoutLanguageOption } from './components/layout/LayoutShell'
export { default as LayoutDemo } from './components/layout/LayoutDemo'
export { default as SidebarMenu } from './components/layout/SidebarMenu'
export { default as FooterBar } from './components/layout/FooterBar'
export type { FooterBarProps } from './components/layout/FooterBar'

// Theme
export { ThemeProvider, useThemeContext } from './theme/ThemeContext'
export { lightTheme, darkTheme, getColors } from './theme/rtmTheme'

// Logo Provider
export { Logo, LogoProvider } from './components/logo'
export type { LogoName } from './components/logo'

// Notification System
export { NotificationProvider, useNotifications } from './components/notification'
export type { NotificationConfig } from './types/notifications'

// Popup Components
export { default as Popup } from './components/popup/Popup'
export { default as NotificationPopup } from './components/popup/NotificationPopup'
export type { PopupConfig } from './types/notifications'

// RTM Icons
export { RtmIcon } from './components/icon'
export type { RtmIconName } from './components/icon'

// Main CSS
import './index.css'

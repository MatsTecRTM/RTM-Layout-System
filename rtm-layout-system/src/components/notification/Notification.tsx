import { useEffect, useState } from "react"
import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import IconButton from "@mui/material/IconButton"
import Button from "@mui/material/Button"
import Link from "@mui/material/Link"
import { useTheme } from "@mui/material/styles"
import CloseIcon from "@mui/icons-material/Close"
import SuccessIcon from "@mui/icons-material/CheckCircle"
import ErrorIcon from "@mui/icons-material/Error"
import WarningIcon from "@mui/icons-material/Warning"
import InfoIcon from "@mui/icons-material/Info"
import ExternalLinkIcon from "@mui/icons-material/OpenInNew"
import MoreIcon from "@mui/icons-material/MoreHoriz"
import { getColors } from "../../theme/rtmTheme"
import NotificationPopup from "../popup/NotificationPopup"
import type { NotificationConfig } from "../../types/notifications"
import "./Notification.css"

export interface NotificationProps {
  notification: NotificationConfig
  onRemove: (id: string) => void
}

function Notification({ notification, onRemove }: NotificationProps) {
  const muiTheme = useTheme()
  const { notificationColor, backgroundDefault } = getColors(muiTheme)

  const { id, type, title, message, autoHide = true, duration = 5000, icon, onClose, actions, link, popup } = notification

  const typeColor = notificationColor(type)
  const [isVisible, setIsVisible] = useState(true)
  const [isPaused, setIsPaused] = useState(false)
  const [showPopup, setShowPopup] = useState(false)

  const getDefaultIcon = () => {
    switch (type) {
      case "success":
        return <SuccessIcon />
      case "error":
        return <ErrorIcon />
      case "warning":
        return <WarningIcon />
      case "info":
        return <InfoIcon />
      default:
        return <InfoIcon />
    }
  }

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => {
      onRemove(id)
      onClose?.()
    }, 400)
  }

  useEffect(() => {
    if (!autoHide) return undefined

    const timeout = setTimeout(() => {
      if (!isPaused) handleClose()
    }, duration)

    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoHide, duration, isPaused])

  return (
    <Box
      className="notification"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      sx={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateX(0)" : "translateX(100%)",
        transition: "opacity 0.4s ease, transform 0.4s ease",
      }}
    >
      <Paper elevation={6} sx={{ width: 400, mb: 2, position: "relative", overflow: "visible", borderRadius: 2, backgroundColor: backgroundDefault }}>
        <Box className="notification-color-bar" sx={{ height: 4, backgroundColor: typeColor }} />
        <Box sx={{ p: 2, display: "flex", alignItems: "flex-start" }}>
          <Box sx={{ mr: 2, color: typeColor, display: "flex", alignItems: "center", fontSize: "1.5rem" }}>{icon || getDefaultIcon()}</Box>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1" className="notification-title" sx={{ fontWeight: 600 }}>
              {title}
            </Typography>
            <Typography variant="body2" className="notification-message" sx={{ mt: 0.5 }}>
              {message}
            </Typography>

            {(link || actions || popup) && (
              <Box sx={{ mt: 1, display: "flex", flexWrap: "wrap", gap: 1 }}>
                {link && (
                  <Link href={link.url} target={link.external ? "_blank" : "_self"} rel={link.external ? "noopener noreferrer" : undefined} onClick={link.onClick} sx={{ fontSize: "0.8rem" }}>
                    {link.label}
                    {link.external && <ExternalLinkIcon fontSize="small" />}
                  </Link>
                )}

                {popup && (
                  <Button size="small" variant="text" onClick={() => setShowPopup(true)} startIcon={<MoreIcon fontSize="small" />} sx={{ textTransform: "none" }}>
                    Details
                  </Button>
                )}

                {actions?.map((action, index) => (
                  <Button key={`${action.label}-${index}`} size="small" variant={action.variant || "text"} onClick={action.onClick} sx={{ textTransform: "none" }}>
                    {action.label}
                  </Button>
                ))}
              </Box>
            )}
          </Box>

          <IconButton onClick={handleClose} size="small">
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      </Paper>

      {popup && <NotificationPopup open={showPopup} onClose={() => setShowPopup(false)} popup={popup} />}
    </Box>
  )
}

export default Notification

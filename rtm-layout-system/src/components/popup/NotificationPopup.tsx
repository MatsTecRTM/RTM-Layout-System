import Box from "@mui/material/Box"
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import DialogContent from "@mui/material/DialogContent"
import DialogActions from "@mui/material/DialogActions"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import IconButton from "@mui/material/IconButton"
import CloseIcon from "@mui/icons-material/Close"
import { useEffect } from "react"
import { useThemeContext } from "../../theme/ThemeContext"
import type { NotificationPopup as NotificationPopupType } from "../../types/notifications"

export interface NotificationPopupProps {
  open: boolean
  onClose: () => void
  popup: NotificationPopupType
}

function NotificationPopup({ open, onClose, popup }: NotificationPopupProps) {
  const { darkMode } = useThemeContext()

  const handleClose = () => {
    popup.onClose?.()
    onClose()
  }

  useEffect(() => {
    if (open) popup.onOpen?.()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth={popup.maxWidth ? false : "md"}
      fullWidth
      slotProps={{ paper: { sx: { backgroundColor: darkMode ? "rgba(20,20,20,0.9)" : "#fff", borderRadius: 2 } } }}
    >
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {popup.title}
        <IconButton onClick={handleClose} size="small">
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ pt: 1, pb: 2 }}>
        {typeof popup.content === "string" ? <Typography sx={{ lineHeight: 1.6 }}>{popup.content}</Typography> : <Box>{popup.content}</Box>}
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={handleClose} variant="outlined">
          Schließen
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default NotificationPopup

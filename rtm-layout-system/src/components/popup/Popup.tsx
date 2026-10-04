import { useEffect, useState } from "react"
import Dialog from "@mui/material/Dialog"
import DialogContent from "@mui/material/DialogContent"
import DialogActions from "@mui/material/DialogActions"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import IconButton from "@mui/material/IconButton"
import Box from "@mui/material/Box"
import useMediaQuery from "@mui/material/useMediaQuery"
import { useTheme } from "@mui/material/styles"
import CloseIcon from "@mui/icons-material/Close"
import MaximizeIcon from "@mui/icons-material/Fullscreen"
import RestoreIcon from "@mui/icons-material/FullscreenExit"
import { getColors } from "../../theme/rtmTheme"
import type { PopupConfig, PopupSize } from "../../types/notifications"

export interface PopupProps {
  open: boolean
  onClose: () => void
  config: PopupConfig
}

function Popup({ open, onClose, config }: PopupProps) {
  const theme = useTheme()
  const { notificationColor, backgroundDefault } = getColors(theme)
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  const [isMaximized, setIsMaximized] = useState(false)

  const {
    title = "",
    content,
    size = "medium",
    showHeader = true,
    showCloseButton = true,
    showMaximizeButton = true,
    maxWidth,
    onOpen,
    onClose: configOnClose,
    onMaximize,
    onRestore,
    actions = [],
  } = config

  const effectiveSize = isMaximized ? "fullscreen" : size

  const getSizeConfig = (targetSize: PopupSize) => {
    switch (targetSize) {
      case "small":
        return { maxWidth: maxWidth || 400, fullWidth: false, height: "auto" }
      case "medium":
        return { maxWidth: maxWidth || 600, fullWidth: true, height: "auto" }
      case "large":
        return { maxWidth: maxWidth || 1200, fullWidth: true, height: "auto" }
      case "fullscreen":
        return {
          maxWidth: false as const,
          fullWidth: true,
          fullScreen: isMobile,
          height: isMobile ? "100vh" : "auto",
        }
      default:
        return { maxWidth: 600, fullWidth: true, height: "auto" }
    }
  }

  const sizeConfig = getSizeConfig(effectiveSize)

  const handleClose = () => {
    configOnClose?.()
    setIsMaximized(false)
    onClose()
  }

  const handleMaximize = () => {
    if (!isMaximized) {
      setIsMaximized(true)
      onMaximize?.()
    } else {
      setIsMaximized(false)
      onRestore?.()
    }
  }

  useEffect(() => {
    if (open) {
      onOpen?.()
      setIsMaximized(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  return (
    <Dialog
      open={open}
      onClose={showCloseButton ? handleClose : undefined}
      maxWidth={sizeConfig.maxWidth ? false : "xl"}
      fullWidth={!!sizeConfig.fullWidth}
      fullScreen={!!sizeConfig.fullScreen}
      slotProps={{
        paper: {
          sx: {
            backgroundColor: backgroundDefault,
            borderRadius: effectiveSize === "fullscreen" && isMobile ? 0 : 2,
            boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
            maxWidth: sizeConfig.maxWidth ? `${sizeConfig.maxWidth}px` : undefined,
            width: effectiveSize === "fullscreen" && !isMobile ? "calc(100vw - 6vh)" : undefined,
            height: sizeConfig.height !== "auto" ? sizeConfig.height : undefined,
            maxHeight: effectiveSize === "fullscreen" ? "calc(100vh - 6vh)" : "calc(100vh - 160px)",
            display: "flex",
            flexDirection: "column",
          },
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: showHeader ? "space-between" : "flex-end",
          alignItems: "center",
          p: showHeader ? 0 : 1,
          backgroundColor: showHeader ? "primary.main" : "background.default",
          color: showHeader ? "primary.contrastText" : "text.primary",
          borderRadius: "8px 8px 0 0",
          minHeight: showHeader ? "48px" : "40px",
        }}
      >
        {showHeader && (
          <Typography
            variant="h6"
            component="span"
            sx={{
              fontSize: effectiveSize === "small" ? "1.1rem" : effectiveSize === "large" || effectiveSize === "fullscreen" ? "1.5rem" : "1.25rem",
              flexGrow: 1,
              color: "primary.contrastText",
              pl: 2,
            }}
          >
            {title}
            {isMaximized && (
              <Typography component="span" sx={{ ml: 1, fontSize: "0.8em", opacity: 0.8, fontStyle: "italic", color: "primary.contrastText" }}>
                (Vollbild)
              </Typography>
            )}
          </Typography>
        )}

        <Box sx={{ display: "flex", gap: 0.5, pr: showHeader ? 1 : 0 }}>
          {showMaximizeButton && !isMobile && effectiveSize !== "fullscreen" && (
            <IconButton onClick={handleMaximize} size="small" sx={{ color: showHeader ? "primary.contrastText" : "text.primary" }} title={isMaximized ? "Verkleinern" : "Vollbild"}>
              {isMaximized ? <RestoreIcon fontSize="small" /> : <MaximizeIcon fontSize="small" />}
            </IconButton>
          )}
          {showCloseButton && (
            <IconButton onClick={handleClose} size="small" sx={{ color: showHeader ? "primary.contrastText" : "text.primary" }} title="Schließen">
              <CloseIcon fontSize="small" />
            </IconButton>
          )}
        </Box>
      </Box>

      <DialogContent
        sx={{
          pt: effectiveSize === "fullscreen" ? 2 : 3,
          pb: actions.length > 0 ? 1 : 3,
          px: effectiveSize === "fullscreen" ? 3 : 4,
          flex: effectiveSize === "fullscreen" ? 1 : "none",
          overflow: "auto",
          maxHeight: effectiveSize === "fullscreen" ? "calc(100vh - 200px)" : "calc(100vh - 300px)",
        }}
      >
        {typeof content === "string" ? <Typography sx={{ color: "text.primary", lineHeight: 1.6 }}>{content}</Typography> : <Box sx={{ color: "text.primary" }}>{content}</Box>}
      </DialogContent>

      {actions.length > 0 && (
        <DialogActions
          sx={{
            px: effectiveSize === "fullscreen" ? 3 : 4,
            pb: 3,
            pt: 2,
            gap: 1,
            borderTop: effectiveSize === "large" || effectiveSize === "fullscreen" ? `1px solid ${theme.palette.divider}` : "none",
          }}
        >
          {actions.map((action, index) => (
            <Button
              key={`${action.label}-${index}`}
              variant={action.variant || "text"}
              onClick={action.onClick}
              sx={{
                textTransform: "none",
                ...(action.variant === "contained" && {
                  backgroundColor:
                    action.color === "error"
                      ? notificationColor("error")
                      : action.color === "warning"
                        ? notificationColor("warning")
                        : action.color === "success"
                          ? notificationColor("success")
                          : undefined,
                  color: "white",
                }),
              }}
            >
              {action.label}
            </Button>
          ))}

          {showCloseButton && actions.length === 0 && (
            <Button onClick={handleClose} variant="outlined" sx={{ textTransform: "none" }}>
              Schließen
            </Button>
          )}
        </DialogActions>
      )}
    </Dialog>
  )
}

export default Popup

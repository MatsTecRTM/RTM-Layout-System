import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { useTheme } from "@mui/material/styles"
import type { SxProps, Theme } from "@mui/material/styles"
import { getColors } from "../../theme/rtmTheme"
import pkg from "../../../package.json"

export interface FooterBarProps {
  impressumPath?: string | null
  datasecurityPath?: string | null
  copyrightText?: string | null
  version?: string | null
  sx?: SxProps<Theme>
}

function FooterBar({
  impressumPath = "/impressum",
  datasecurityPath = "/datasecurity",
  copyrightText = "© RomerTM Group · All rights reserved",
  version = pkg.version,
  sx,
}: FooterBarProps) {
  const theme = useTheme()
  const { textPrimary } = getColors(theme)

  return (
    <Box
      component="footer"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 1,
        marginLeft: "-8px",
        marginRight: "-8px",
        marginBottom: "-8px",
        paddingLeft: "24px",
        paddingRight: "24px",
        paddingTop: "12px",
        paddingBottom: "12px",
        width: "calc(100% + 16px)",
        boxSizing: "border-box",
        backgroundColor: theme.palette.background.default,
        color: textPrimary,
        boxShadow: "0 -2px 6px rgba(0,0,0,0.1)",
        ...sx,
      }}
    >
      <Box sx={{ display: "flex", gap: 2 }}>
        {impressumPath && (
          <Typography variant="body2" component="a" href={impressumPath} sx={{ textDecoration: "none", color: textPrimary }}>
            Impressum
          </Typography>
        )}
        {datasecurityPath && (
          <Typography variant="body2" component="a" href={datasecurityPath} sx={{ textDecoration: "none", color: textPrimary }}>
            Datenschutz
          </Typography>
        )}
      </Box>

      <Typography variant="body2">{copyrightText}</Typography>

      <Typography variant="body2">Version: {version}</Typography>
    </Box>
  )
}

export default FooterBar

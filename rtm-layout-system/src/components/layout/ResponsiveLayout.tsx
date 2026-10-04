import { useMediaQuery, useTheme } from "@mui/material"
import type { ReactNode } from "react"
import ComputerLayout from "./ComputerLayout"
import TabletLayout from "./TabletLayout"
import PhoneLayout from "./PhoneLayout"

export interface ResponsiveLayoutProps {
  children: ReactNode
}

/**
 * Wählt anhand der MUI-Breakpoints automatisch den passenden
 * Geräte-Wrapper (Phone / Tablet / Computer) aus.
 */
function ResponsiveLayout({ children }: ResponsiveLayoutProps) {
  const theme = useTheme()
  const isPhone = useMediaQuery(theme.breakpoints.down("sm"))
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"))

  if (isPhone) return <PhoneLayout>{children}</PhoneLayout>
  if (isTablet) return <TabletLayout>{children}</TabletLayout>
  return <ComputerLayout>{children}</ComputerLayout>
}

export default ResponsiveLayout

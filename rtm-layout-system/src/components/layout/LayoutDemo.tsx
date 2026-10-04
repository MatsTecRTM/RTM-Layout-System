import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import LayoutShell from "./LayoutShell"
import { ThemeProvider } from "../../theme/ThemeContext"
import { LogoProvider } from "../logo"
import { NotificationProvider } from "../notification"

function LayoutDemoContent() {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        RTM Layout System
      </Typography>
      <Typography variant="body1">
        Willkommen! Beginne hier mit deinen Inhalten.
      </Typography>
    </Box>
  )
}

function LayoutDemo() {
  return (
    <ThemeProvider>
      <LogoProvider>
        <NotificationProvider>
          <LayoutShell
            variant="sidebar"
            showHeader={true}
            showFooter={true}
            pages={[]}
            selectedPage=""
            mode="light"
            onToggleTheme={() => {}}
            headerTitle="RTM Layout System"
            footerProps={{}}
          >
            <LayoutDemoContent />
          </LayoutShell>
        </NotificationProvider>
      </LogoProvider>
    </ThemeProvider>
  )
}

export default LayoutDemo

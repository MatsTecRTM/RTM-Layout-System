import { createTheme } from "@mui/material/styles"
import type { Theme } from "@mui/material"
import type { PaletteColor } from "@mui/material/styles"

declare module "@mui/material/styles" {
  interface PaletteColorExtended extends PaletteColor {
    primary: string
    secondary: string
  }

  interface Palette {
    RomerTMColor?: PaletteColorExtended
    HQSuiteColor?: {
      HQSuite: PaletteColorExtended
      HQEvent: PaletteColorExtended
      HQFire: PaletteColorExtended
      HQEnergy: PaletteColorExtended
      HQAuth: PaletteColorExtended
    }
    table?: {
      header?: string
      rowAlt?: string
      rowBase?: string
      hover?: string
    }
  }
  interface PaletteOptions {
    RomerTMColor?: Partial<PaletteColorExtended>
    HQSuiteColor?: {
      HQSuite?: Partial<PaletteColorExtended>
      HQEvent?: Partial<PaletteColorExtended>
      HQFire?: Partial<PaletteColorExtended>
      HQEnergy?: Partial<PaletteColorExtended>
      HQAuth?: Partial<PaletteColorExtended>
    }
    table?: {
      header?: string
      rowAlt?: string
      rowBase?: string
      hover?: string
    }
  }
}

// Defined Colors Standard
const hqEventBlue = "#2965ae"
const hqAuthOrange = "#f9b233"
const hqFireRed = "#c91517"
const hqSuiteGreen = "#058b38"
const hqEnergyPurple = "#7a3d7f"
const romerTmBlue = "#2965ae"
// Defined Colors Dark
const hqEventBlueDark = "#1a355c"
const hqAuthOrangeDark = "#b97a1a"
const hqFireRedDark = "#7a1011"
const hqSuiteGreenDark = "#035c24"
const hqEnergyPurpleDark = "#5e2e66"
const romerTmBlueDark = "#1a355c"

// Defined Colors Light
const hqEventBlueLight = "#3b8cefff"
const hqAuthOrangeLight = "#fbc261ff"
const hqFireRedLight = "#ff3a3dff"
const hqSuiteGreenLight = "#09be4eff"
const hqEnergyPurpleLight = "#b356bbff"
const romerTmBlueLight = "#3b8cefff"

// Defined Colors
const textLight = "#222"
const textDark = "#ffffff"
const textSecondaryLight = "rgba(0, 0, 0, 0.6)"
const textSecondaryDark = "rgba(255, 255, 255, 0.7)"
// Hintergrundfarben
const bgLightDefault = "#ffffffff"
const bgLightPaper = "#f5f6f8ff"
const bgDarkDefault = "#181a1b"
const bgDarkPaper = "#23272a"

// Standardfarben fuer Header/Sidebar/Icon-Flaeche (hell, konfigurierbar via LayoutShell-Props)
export const defaultHeaderBackgroundLight = "#ffffffff"
export const defaultSidebarBackgroundLight = "#f5f6f8ff"
export const defaultIconBackgroundLight = "#ffffffff"
export const defaultHeaderBackgroundDark = bgDarkPaper
export const defaultSidebarBackgroundDark = bgDarkPaper
export const defaultIconBackgroundDark = "#2c3134"

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: hqEventBlue },
    secondary: { main: hqSuiteGreen },
    error: { main: hqFireRed },
    info: { main: hqEventBlue },
    warning: { main: hqAuthOrange },
    success: { main: hqSuiteGreenLight },
    background: {
      default: bgLightDefault,
      paper: bgLightPaper,
    },
    RomerTMColor: {
      primary: romerTmBlue,
      secondary: romerTmBlueDark,
      light: romerTmBlueLight,
      main: romerTmBlue,
      dark: romerTmBlueDark,
    },
    HQSuiteColor: {
      HQSuite: {
        primary: hqSuiteGreen,
        secondary: hqSuiteGreenDark,
        main: hqSuiteGreen,
        dark: hqSuiteGreenDark,
        light: hqSuiteGreenLight,
      },
      HQEvent: {
        primary: hqEventBlue,
        secondary: hqEventBlueDark,
        main: hqEventBlue,
        dark: hqEventBlueDark,
        light: hqEventBlueLight,
      },
      HQFire: {
        primary: hqFireRed,
        secondary: hqFireRedDark,
        main: hqFireRed,
        dark: hqFireRedDark,
        light: hqFireRedLight,
      },
      HQEnergy: {
        primary: hqEnergyPurple,
        secondary: hqEnergyPurpleDark,
        main: hqEnergyPurple,
        dark: hqEnergyPurpleDark,
        light: hqEnergyPurpleLight,
      },
      HQAuth: {
        primary: hqAuthOrange,
        secondary: hqAuthOrangeDark,
        main: hqAuthOrange,
        dark: hqAuthOrangeDark,
        light: hqAuthOrangeLight,
      },
    },
    table: {
      header: "#ffffff",
      rowAlt: "#f6f6f6",
      rowBase: "#ffffff",
      hover: "#efefef",
    },
    text: {
      primary: textLight,
      secondary: textSecondaryLight,
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h1: {
      color: textLight,
      fontWeight: 700,
    },
    h2: {
      color: textLight,
      fontWeight: 700,
      letterSpacing: "-0.5px",
    },
    h3: {
      color: textLight,
      fontWeight: 600,
    },
    h4: {
      color: textLight,
      fontWeight: 600,
    },
    h5: {
      color: textLight,
      fontWeight: 500,
    },
    h6: {
      color: textLight,
      fontWeight: 500,
    },
  },
})

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: hqEventBlueDark },
    secondary: { main: hqAuthOrangeDark },
    error: { main: hqFireRedDark },
    info: { main: hqEventBlueDark },
    warning: { main: hqAuthOrangeDark },
    success: { main: hqSuiteGreenDark },
    background: {
      default: bgDarkDefault,
      paper: bgDarkPaper,
    },
    RomerTMColor: {
      primary: romerTmBlueDark,
      secondary: romerTmBlue,
      light: romerTmBlueLight,
      main: romerTmBlueDark,
      dark: romerTmBlueDark,
    },
    HQSuiteColor: {
      HQSuite: {
        primary: hqSuiteGreen,
        secondary: hqSuiteGreenDark,
        main: hqSuiteGreen,
        dark: hqSuiteGreenDark,
        light: hqSuiteGreenLight,
      },
      HQEvent: {
        primary: hqEventBlue,
        secondary: hqEventBlueDark,
        main: hqEventBlue,
        dark: hqEventBlueDark,
        light: hqEventBlueLight,
      },
      HQFire: {
        primary: hqFireRed,
        secondary: hqFireRedDark,
        main: hqFireRed,
        dark: hqFireRedDark,
        light: hqFireRedLight,
      },
      HQEnergy: {
        primary: hqEnergyPurple,
        secondary: hqEnergyPurpleDark,
        main: hqEnergyPurple,
        dark: hqEnergyPurpleDark,
        light: hqEnergyPurpleLight,
      },
      HQAuth: {
        primary: hqAuthOrange,
        secondary: hqAuthOrangeDark,
        main: hqAuthOrange,
        dark: hqAuthOrangeDark,
        light: hqAuthOrangeLight,
      },
    },
    table: {
      header: "#1f2326",
      rowAlt: "rgba(255,255,255,0.03)",
      rowBase: "#121212",
      hover: "rgba(255,255,255,0.04)",
    },
    text: {
      primary: textDark,
      secondary: textSecondaryDark,
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h1: {
      color: textDark,
      fontWeight: 700,
    },
    h2: {
      color: textDark,
      fontWeight: 700,
      letterSpacing: "-0.5px",
    },
    h3: {
      color: textDark,
      fontWeight: 600,
    },
    h4: {
      color: textDark,
      fontWeight: 600,
    },
    h5: {
      color: textDark,
      fontWeight: 500,
    },
    h6: {
      color: textDark,
      fontWeight: 500,
    },
  },
})

export { lightTheme, darkTheme }

// Export helper to get derived colors from a Theme instance
export const getColors = (theme: Theme) => {
  const palette = theme.palette

  const eventColor = palette.HQSuiteColor?.HQEvent?.main ?? "#2965ae"
  const authColor = palette.HQSuiteColor?.HQAuth?.main ?? "#f9b233"
  const tableHeader = palette.table?.header ?? (palette.mode === "dark" ? "#1f2326" : "#f5f7fa")
  const tableRowAlt = palette.table?.rowAlt ?? (palette.mode === "dark" ? "rgba(255,255,255,0.03)" : "#fafafa")
  const tableRowBase = palette.table?.rowBase ?? (palette.mode === "dark" ? "#121212" : "#ffffff")
  const tableHover = palette.table?.hover ?? (palette.mode === "dark" ? "rgba(255,255,255,0.04)" : "#f4f4f4")

  return {
    primary: palette.primary.main,
    backgroundDefault: palette.background.default,
    textPrimary: palette.text.primary,
    divider: palette.divider,
    mode: palette.mode,
    eventColor,
    authColor,
    tableHeader,
    tableRowAlt,
    tableRowBase,
    tableHover,
    hoverBg: (alpha: number) => `${authColor}${Math.round(alpha * 255).toString(16).padStart(2, "0")}`,
    notificationColor: (type?: string) => {
      switch (type) {
        case "success":
          return palette.success?.main ?? palette.primary.main
        case "error":
          return palette.error?.main ?? palette.primary.main
        case "warning":
          return palette.warning?.main ?? palette.primary.main
        case "info":
          return palette.info?.main ?? palette.primary.main
        default:
          return palette.primary.main
      }
    },
  }
}

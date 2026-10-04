import type { ReactNode } from "react"
import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { lightTheme, darkTheme } from "./rtmTheme"

interface ThemeContextType {
  darkMode: boolean
  toggleTheme: () => void
}

interface ThemeProviderProps {
  children: ReactNode
  primaryColor?: string
  secondaryColor?: string
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const useThemeContext = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider")
  }
  return context
}

export const ThemeProvider = ({ children, primaryColor, secondaryColor }: ThemeProviderProps) => {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const stored = globalThis.localStorage.getItem("rtm-dark-mode")
    return stored ? (JSON.parse(stored) as boolean) : false
  })

  useEffect(() => {
    globalThis.localStorage.setItem("rtm-dark-mode", JSON.stringify(darkMode))
  }, [darkMode])

  const toggleTheme = () => {
    setDarkMode((prev) => !prev)
  }

  const theme = useMemo(() => {
    const baseTheme = darkMode ? darkTheme : lightTheme
    if (!primaryColor && !secondaryColor) return baseTheme
    return {
      ...baseTheme,
      palette: {
        ...baseTheme.palette,
        primary: primaryColor ? { ...baseTheme.palette.primary, main: primaryColor } : baseTheme.palette.primary,
        secondary: secondaryColor ? { ...baseTheme.palette.secondary, main: secondaryColor } : baseTheme.palette.secondary,
      },
    }
  }, [darkMode, primaryColor, secondaryColor])
  const contextValue = useMemo(() => ({ darkMode, toggleTheme }), [darkMode])

  return (
    <ThemeContext.Provider value={contextValue}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  )
}

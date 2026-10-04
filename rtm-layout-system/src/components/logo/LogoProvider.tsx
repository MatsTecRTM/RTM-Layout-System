import React from "react"
import { useTheme } from "@mui/material/styles"
import { logos } from "./logos"
import type { LogoName } from "./logos"

interface LogoContextValue {
  get: (name: LogoName) => React.FC<React.ImgHTMLAttributes<HTMLImageElement>> | undefined
}

const LogoContext = React.createContext<LogoContextValue>({ get: (n) => logos[n] })

export const LogoProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const get = React.useCallback((name: LogoName) => logos[name], [])
  const value = React.useMemo(() => ({ get }), [get])
  return <LogoContext.Provider value={value}>{children}</LogoContext.Provider>
}

export const useLogo = () => React.useContext(LogoContext)

export const Logo: React.FC<{ name: LogoName; size?: number; className?: string }> = ({ name, size = 24, className }) => {
  const theme = useTheme()
  const { get } = useLogo()
  const preferWhite = theme.palette.mode === "dark"
  const whiteName = (name + "White") as LogoName
  const Comp = preferWhite && get(whiteName) ? get(whiteName) : get(name)
  if (!Comp) return null
  return <Comp height={size} style={{ width: "auto" }} className={className} />
}

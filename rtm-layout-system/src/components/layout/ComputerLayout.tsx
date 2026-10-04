import type { ReactNode } from "react"

export interface ResponsiveLayoutProps {
  children: ReactNode
}

function ComputerLayout({ children }: ResponsiveLayoutProps) {
  return <div className="computer-layout">{children}</div>
}

export default ComputerLayout

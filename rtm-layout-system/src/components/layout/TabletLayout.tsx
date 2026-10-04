import type { ReactNode } from "react"

export interface ResponsiveLayoutProps {
  children: ReactNode
}

function TabletLayout({ children }: ResponsiveLayoutProps) {
  return <div className="tablet-layout">{children}</div>
}

export default TabletLayout

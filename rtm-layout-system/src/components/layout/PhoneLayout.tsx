import type { ReactNode } from "react"

export interface ResponsiveLayoutProps {
  children: ReactNode
}

function PhoneLayout({ children }: ResponsiveLayoutProps) {
  return <div className="phone-layout">{children}</div>
}

export default PhoneLayout

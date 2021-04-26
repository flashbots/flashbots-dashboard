import React, { useState } from "react"
import { DASHBOARDS } from "../../Constants/DashboardUrls"
import { Dashboard } from "./Types"

type DashboardContextProps = {
  children: React.ReactNode | React.ReactNode[]
}

type DashboardContext = {
  endpoints: Dashboard[]
}

const DashboardContext = React.createContext<DashboardContext | undefined>(undefined)


const DashboardProvider = ({ children }: DashboardContextProps) => {
  const [dashboards] = useState(DASHBOARDS)
  return (
    <DashboardContext.Provider
      value={{
        endpoints: dashboards
      }}
    >
      {children}
    </DashboardContext.Provider>
  )
}

const useDashboard = () => {
  const context = React.useContext(DashboardContext)
  if (context === undefined) {
    throw new Error("useDashboard must be used within a DashboardProvider")
  }
  return context
}

export { DashboardProvider, useDashboard }

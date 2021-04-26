import React from "react"
import { Switch, Route, Redirect } from "@chainsafe/common-components"
import DashboardPage from "./Pages/DashboardPage"

export const ROUTE_LINKS = {
  Dashboard: (dashboard: string) => `/${dashboard}`,
}

const FilesRoutes = () => {
  return (
    <Switch>
      <Route
        exact
        path={ROUTE_LINKS.Dashboard(":dashboard")}
        component={DashboardPage}
      />
      <Redirect 
        exact
        path="/"
        to={ROUTE_LINKS.Dashboard("network")}
      />
    </Switch>
  )
}

export default FilesRoutes

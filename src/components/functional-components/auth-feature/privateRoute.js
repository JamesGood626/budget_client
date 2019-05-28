import React from "react"
import { navigate } from "gatsby"

const PrivateRoute = ({
  component: Component,
  authenticated,
  dispatchLogout,
  location,
  ...rest
}) => {
  const acceptableUnauthRoutes =
    location.pathname !== `/app/signup` || location.pathname !== `/app/login`
  if (!authenticated && acceptableUnauthRoutes) {
    navigate(`/app/login`)
    return null
  }

  return <Component {...rest} dispatchLogout={dispatchLogout} />
}

export default PrivateRoute

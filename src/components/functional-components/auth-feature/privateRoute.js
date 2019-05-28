import React from "react"
import { navigate } from "gatsby"

const PrivateRoute = ({
  component: Component,
  authenticated,
  location,
  ...rest
}) => {
  const acceptableUnauthRoutes =
    location.pathname !== `/app/signup` || location.pathname !== `/app/login`
  if (!authenticated && acceptableUnauthRoutes) {
    navigate(`/app/login`)
    return null
  }

  return <Component {...rest} />
}

export default PrivateRoute

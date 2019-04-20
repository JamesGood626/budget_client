import React from "react"
import { navigate } from "gatsby"

// TODO: implement the isLoggedIn check
const PrivateRoute = ({
  component: Component,
  authenticated,
  location,
  ...rest
}) => {
  console.log("AUTHENTICATED IN PRIVATE ROUTE: ", authenticated)
  if (!authenticated && location.pathname !== `/app/login`) {
    // If the user is not logged in, redirect to the login page.
    navigate(`/app/login`)
    return null
  }

  return <Component {...rest} />
}

export default PrivateRoute

import React from "react"
import PropTypes from "prop-types"

import AuthReducerProvider from "../components/reducers/auth/authReducerProvider"
import useAuthReducer from "../components/reducers/auth/AuthReducer"
import Navbar from "./functional-components/foundational-components/navbar"
import "./layout.css"

const Layout = ({ children }) => {
  const reducer = useAuthReducer()
  console.log(`typeof children: ${typeof children}`)
  return (
    <AuthReducerProvider reducer={reducer}>
      {({ state: { authenticated }, login, logout }) => {
        return (
          <>
            <Navbar authenticated={authenticated} logout={logout} />
            {typeof children === "function"
              ? children({ authenticated, login, logout })
              : children}
          </>
        )
      }}
    </AuthReducerProvider>
  )
}

export default Layout

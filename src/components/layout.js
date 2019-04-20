import React from "react"
import PropTypes from "prop-types"

import AuthReducerProvider from "../components/reducers/auth/authReducerProvider"
import useAuthReducer from "../components/reducers/auth/AuthReducer"
import Navbar from "./functional-components/navbar"
import "./layout.css"

const Layout = ({ children }) => {
  const reducer = useAuthReducer()
  return (
    <AuthReducerProvider reducer={reducer}>
      {({ state: { authenticated }, login, logout }) => {
        return (
          <>
            <Navbar authenticated={authenticated} logout={logout} />
            {children({ authenticated, login, logout })}
          </>
        )
      }}
    </AuthReducerProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.func,
}

export default Layout

import React, { useEffect } from "react"
import PropTypes from "prop-types"

import AuthReducerProvider from "components/reducers/auth/authReducerProvider"
import useAuthReducer from "components/reducers/auth/AuthReducer"
import Navbar from "components/functional-components/foundational-components/navbar"
import "./layout.css"
import axios from "axios"
import endpoints from "config/api_endpoints"

axios.defaults.withCredentials = true

const Layout = ({ children }) => {
  const reducer = useAuthReducer()
  const fetchCsrfToken = async () => {
    const {
      data: { csrf_token },
    } = await axios.get(endpoints.CSRF_URL)
    console.log("Got the csrf token: ", csrf_token)
    axios.defaults.headers.common["X-CSRF-TOKEN"] = csrf_token
  }
  useEffect(async () => {
    await fetchCsrfToken()
  }, [])

  console.log(`typeof children: ${typeof children}`)
  return (
    <AuthReducerProvider reducer={reducer}>
      {({ state: { authenticated }, dispatchLogin, dispatchLogout }) => {
        return (
          <>
            <Navbar
              authenticated={authenticated}
              dispatchLogout={dispatchLogout}
            />
            {typeof children === "function"
              ? children({ authenticated, dispatchLogin, dispatchLogout })
              : children}
          </>
        )
      }}
    </AuthReducerProvider>
  )
}

export default Layout

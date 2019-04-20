import React from "react"
import AuthContext from "./AuthContext"

const AuthReducerProvider = ({ children, reducer }) => {
  return (
    <AuthContext.Provider value={reducer}>
      {children(reducer)}
    </AuthContext.Provider>
  )
}

export default AuthReducerProvider

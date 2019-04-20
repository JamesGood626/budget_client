import { useReducer } from "react"
import { LOGIN, LOGOUT } from "./authReducerActions"

function reducer(state, action) {
  switch (action.type) {
    case LOGIN:
      return { ...state, authenticated: true }
    case LOGOUT:
      return { ...state, authenticated: false }
  }
}

const initialState = {
  authenticated: false,
}

const useAuthReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const login = () => dispatch({ type: LOGIN })
  const logout = redirectToLoginPage => {
    dispatch({ type: LOGOUT })
    redirectToLoginPage()
  }

  return {
    state,
    dispatch,
    login,
    logout,
  }
}

export default useAuthReducer

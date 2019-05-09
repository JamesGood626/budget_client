import { useReducer } from "react"
import actions from "components/reducers/auth/authReducerActions"

console.log("WHAT ARE ACTIONS: ", actions)

function reducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return { ...state, authenticated: true }
    case actions.LOGOUT:
      return { ...state, authenticated: false }
    default:
      return state
  }
}

const initialState = {
  authenticated: true,
}

const useAuthReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const login = () => dispatch({ type: actions.LOGIN })
  const logout = redirectToLoginPage => {
    dispatch({ type: actions.LOGOUT })
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

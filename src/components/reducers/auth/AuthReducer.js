import { useReducer } from "react"
import actions from "components/reducers/auth/authReducerActions"

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

let initialState = {
  authenticated: false,
}

const useAuthReducer = () => {
  // TODO: need to add that user is authenticated inside of localStorage, but need
  // to add an expiry time both on the backend, and on the frontend to ensure that
  // they are redirected to the login page the next time they visit.
  const rememberToken = window.localStorage.getItem("rememberToken")
  console.log("the rememberToken: ", rememberToken)
  if (!rememberToken) {
    initialState = { ...initialState, authenticated: false }
  } else {
    initialState = { ...initialState, authenticated: true }
  }
  const [state, dispatch] = useReducer(reducer, initialState)
  const login = () => {
    // Will need to refactor to include token expiry in localStorage as well.
    window.localStorage.setItem("rememberToken", true)
    dispatch({ type: actions.LOGIN })
  }
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

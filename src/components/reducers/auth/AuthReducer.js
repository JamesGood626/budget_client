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
  const authenticated = window.localStorage.getItem("authenticated")
  console.log("the authenticated: ", authenticated)
  if (!authenticated) {
    initialState = { ...initialState, authenticated: false }
  } else {
    initialState = { ...initialState, authenticated: true }
  }
  const [state, dispatch] = useReducer(reducer, initialState)
  const dispatchLogin = () => {
    // Will need to refactor to include token expiry in localStorage as well.
    window.localStorage.setItem("authenticated", true)
    dispatch({ type: actions.LOGIN })
  }
  const dispatchLogout = () => {
    window.localStorage.removeItem("authenticated")
    dispatch({ type: actions.LOGOUT })
  }

  return {
    state,
    dispatch,
    dispatchLogin,
    dispatchLogout,
  }
}

export default useAuthReducer

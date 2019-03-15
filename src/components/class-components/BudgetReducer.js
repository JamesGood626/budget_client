import { useReducer } from "react"

const SET_STATE = "SET_STATE"
const DESPOSIT = "DEPOSIT"
const EXPENSE = "EXPENSE"

function reducer(state, action) {
  switch (action.type) {
    case SET_STATE:
      return { ...state, data: action.payload }
    case DESPOSIT:
      return state // add deposit to target array
    case EXPENSE:
      return state // add expense to target array
    case IN_PROGRESS:
      return state
  }
}

const initialState = {
  data: null,
  inProgress: false,
}

const useBudgetReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const setBudgetData = data => dispatch({ type: SET_STATE, payload: data })

  return {
    state,
    dispatch,
    setBudgetData,
  }
}

export default useBudgetReducer

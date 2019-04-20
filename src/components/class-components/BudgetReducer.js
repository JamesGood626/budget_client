import { useReducer } from "react"
import {
  SET_STATE,
  DEPOSIT,
  NECESSARY_EXPENSE,
  UNNECESSARY_EXPENSE,
  TOGGLE_IN_PROGRESS,
} from "../budgetReducerActions"

function reducer(state, action) {
  switch (action.type) {
    case SET_STATE:
      return { ...state, data: action.payload }
    case DEPOSIT:
      return state // add deposit to target array
    case NECESSARY_EXPENSE:
      return state // add expense to target array
    case UNNECESSARY_EXPENSE:
      return state // add expense to target array
    case TOGGLE_IN_PROGRESS:
      return { ...state, inProgress: !state.inProgress }
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

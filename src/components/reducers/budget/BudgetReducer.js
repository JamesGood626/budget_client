import { useReducer } from "react"
import actions from "./budgetReducerActions"

function reducer(state, action) {
  console.log("The state: ", state)
  console.log("The action: ", action)
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, data: action.payload }
    case actions.DEPOSIT:
      return {
        ...state,
        data: updateNestedDepositData(state.data, action.payload),
      } // add deposit to target array
    case actions.NECESSARY_EXPENSE:
      return state // add expense to target array
    case actions.UNNECESSARY_EXPENSE:
      return state // add expense to target array
    case actions.TOGGLE_IN_PROGRESS:
      return { ...state, inProgress: !state.inProgress }
    default:
      return state
  }
}

const initialState = {
  data: null,
  inProgress: false,
}

const useBudgetReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const setBudgetData = data =>
    dispatch({ type: actions.SET_STATE, payload: data })

  return {
    state,
    dispatch,
    setBudgetData,
  }
}

const updateNestedDepositData = (
  data,
  { result, current_month, current_year }
) => {
  const parsed = JSON.parse(result.data)
  const currentMonthData =
    data.years_tracked[current_year].months_tracked[current_month]
  console.log(`THE PARSED JSON: ${parsed}`)
  return {
    ...data,
    budget: {
      ...data.budget,
      account_balance: parsed.account_balance,
    },
    years_tracked: {
      ...data.years_tracked,
      [current_year]: {
        months_tracked: {
          ...data.years_tracked[current_year].months_tracked,
          [current_month]: {
            ...currentMonthData,
            total_deposited:
              currentMonthData.total_deposited + parsed.total_deposited,
            deposits: [...currentMonthData.deposits, ...parsed.deposits],
          },
        },
      },
    },
  }
}

export default useBudgetReducer

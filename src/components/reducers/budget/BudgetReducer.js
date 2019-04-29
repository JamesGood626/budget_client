import { useReducer } from "react"
import actions from "./budgetReducerActions"

function reducer(state, action) {
  console.log("The state: ", state)
  console.log("The action: ", action)
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, data: action.payload }
    case actions.DEPOSIT:
      console.log("IS this even hitting deposit in reducer???")
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
  { result: { data: resultData }, current_month, current_year }
) => {
  console.log("THE RESULT DATA: ", resultData)
  // const parsed = JSON.parse(result.data)
  const currentMonthData =
    data.years_tracked[current_year].months_tracked[current_month]
  const depositEntry = {
    category: resultData.category,
    type: resultData.type,
    amount: resultData.amount,
    date: resultData.date,
  }
  return {
    ...data,
    budget: {
      ...data.budget,
      account_balance: resultData.account_balance,
    },
    years_tracked: {
      ...data.years_tracked,
      [current_year]: {
        months_tracked: {
          ...data.years_tracked[current_year].months_tracked,
          [current_month]: {
            ...currentMonthData,
            total_deposited:
              currentMonthData.total_deposited + resultData.total_deposited,
            deposits: [...currentMonthData.deposits, depositEntry],
          },
        },
      },
    },
  }
}

export default useBudgetReducer

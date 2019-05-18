import { useReducer } from "react"
import actions from "components/reducers/budget/budgetReducerActions"

function reducer(state, action) {
  console.log("The state: ", state)
  console.log("The action: ", action)
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, data: action.payload }
    case actions.SET_BUDGET:
      const { budget_amount } = action.payload.data
      return setBudgetUpdateState(state, budget_amount)
    case actions.DEPOSIT:
      return {
        ...state,
        data: updateNestedData(
          state.data,
          action.payload,
          "total_deposited",
          "deposits"
        ),
      }
    case actions.NECESSARY_EXPENSE:
      return {
        ...state,
        data: updateNestedData(
          state.data,
          action.payload,
          "total_necessary_expenses",
          "necessary_expenses"
        ),
      }
    case actions.UNNECESSARY_EXPENSE:
      return {
        ...state,
        data: updateNestedData(
          state.data,
          action.payload,
          "total_unnecessary_expenses",
          "unnecessary_expenses"
        ),
      }
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

const setBudgetUpdateState = (state, budget_amount) => ({
  ...state,
  data: {
    ...state.data,
    budget: {
      ...state.data.budget,
      current_budget: budget_amount,
      budget_set: true,
    },
  },
})

const updateNestedData = (
  data,
  { result: { data: resultData }, current_month, current_year },
  nestedTotal,
  nestedArray
) => {
  // console.log("the resultData before: ", resultData)
  // resultData = JSON.parse(resultData)
  // console.log("the resultData after: ", resultData)
  if (typeof resultData === "string") {
    resultData = JSON.parse(resultData)
  }
  const currentMonthData =
    data.years_tracked[current_year].months_tracked[current_month]
  const entry = {
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
            [nestedTotal]: currentMonthData[nestedTotal] + resultData["amount"],
            [nestedArray]: [...currentMonthData[nestedArray], entry],
          },
        },
      },
    },
  }
}

export default useBudgetReducer

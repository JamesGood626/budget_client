import { useReducer } from "react"
import actions from "components/reducers/budget/budgetReducerActions"

function reducer(state, action) {
  console.log("The state: ", state)
  console.log("The action: ", action)
  switch (action.type) {
    case actions.SET_STATE:
      console.log("the action.payload from SET_STATE: ", action.payload)
      return { ...state, data: action.payload }
    case actions.SET_BUDGET:
      const data = action.payload
      const result = setBudgetUpdateState(state, data)
      return result
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

// @budget_post_result %{
//   "budget" => %{
//     "account_balance" => 0,
//     "budget_exceeded" => false,
//     "budget_set" => true,
//     "current_budget" => 60000
//   },
//   "current_month" => 5,
//   "current_month" => 2019,
//   "message" => "Successfully set your budget for the month.",
//   "updated_month_data" => %{
//     "budget" => 60000,
//     "budget_exceeded" => false,
//     "deposits" => [],
//     "necessary_expenses" => [],
//     "total_deposited" => 0,
//     "total_necessary_expenses" => 0,
//     "total_unnecessary_expenses" => 0,
//     "unnecessary_expenses" => []
//   }
// }

const setBudgetUpdateState = (state, data) => {
  const { budget, updated_month_data, current_month, current_year } = data
  return {
    ...state,
    data: {
      ...state.data,
      budget: budget,
      years_tracked: {
        ...state.data.years_tracked,
        [current_year]: {
          months_tracked: {
            ...state.data.years_tracked[current_year].months_tracked,
            [current_month]: updated_month_data,
          },
        },
      },
    },
  }
}

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

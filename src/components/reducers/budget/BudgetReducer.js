import { useReducer } from "react"
import actions from "components/reducers/budget/budgetReducerActions"

// budget: {
//   current_budget: null,
//   budget_set: false,
//   budget_exceeded: false,
//   account_balance: 0,
// },

function reducer(state, action) {
  console.log("The state: ", state)
  console.log("The action: ", action)
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, data: action.payload }
    case actions.SET_BUDGET:
      const { budget_amount } = action.payload.data
      // change current_budget on state.budget
      const updatedState = {
        ...state,
        data: {
          ...state.data,
          budget: {
            ...state.data.budget,
            current_budget: budget_amount,
            budget_set: true,
          },
        },
      }
      console.log("THE UPDATED STATE FROM SET_BUDGET: ", updatedState)
      return updatedState
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

const updateNestedData = (
  data,
  { result: { data: resultData }, current_month, current_year },
  nestedTotal,
  nestedArray
) => {
  console.log("THE RESULT DATA: ", resultData)
  // const parsed = JSON.parse(result.data)
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

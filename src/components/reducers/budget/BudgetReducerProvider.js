import React from "react"
import BudgetContext from "components/reducers/budget/BudgetContext"

const BudgetReducerProvider = ({ children, reducer: { state, dispatch } }) => {
  return (
    <BudgetContext.Provider value={{ state, dispatch }}>
      {children(state)}
    </BudgetContext.Provider>
  )
}

export default BudgetReducerProvider

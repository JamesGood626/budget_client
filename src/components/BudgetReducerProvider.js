import React from "react"
import BudgetContext from "./BudgetContext"

const BudgetReducerProvider = ({ children, reducer: { state, dispatch } }) => {
  return (
    <BudgetContext.Provider value={{ state, dispatch }}>
      {children(state)}
    </BudgetContext.Provider>
  )
}

export default BudgetReducerProvider

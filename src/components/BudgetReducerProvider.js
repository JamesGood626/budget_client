import React from "react"
import BudgetContext from "./BudgetContext"
import BudgetDisplay from "./class-components/BudgetDisplay"

const BudgetReducerProvider = ({ reducer: { state, dispatch } }) => {
  console.log("The budget reducer provider state: ", state)
  return (
    <BudgetContext.Provider value={{ state, dispatch }}>
      {/* Make this into a render prop instead so that BudgetDisplay is still
      seen in BudgetCoordinator's render for better readability */}
      <BudgetDisplay budgetData={state} />
    </BudgetContext.Provider>
  )
}

export default BudgetReducerProvider

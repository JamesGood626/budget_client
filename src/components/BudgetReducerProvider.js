import React from "react"
import BudgetContext from "./BudgetContext"
import BudgetDisplay from "./class-components/BudgetDisplay"

const BudgetReducerProvider = ({ children, reducer: { state, dispatch } }) => {
  console.log("The budget reducer provider state: ", state)
  console.log("THE CHILDREN: ", children)
  return (
    <BudgetContext.Provider value={{ state, dispatch }}>
      {/* Make this into a render prop instead so that BudgetDisplay is still
      seen in BudgetCoordinator's render for better readability */}
      {children(state)}
    </BudgetContext.Provider>
  )
}

export default BudgetReducerProvider

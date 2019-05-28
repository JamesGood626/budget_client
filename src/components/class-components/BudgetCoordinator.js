import React from "react"
import axios from "axios"
import styled from "styled-components"
import useBudgetReducer from "components/reducers/budget/BudgetReducer"
import BudgetReducerProvider from "components/reducers/budget/BudgetReducerProvider"
import BudgetDisplay from "components/class-components/BudgetDisplay"
import endpoints from "config/api_endpoints"
import { navigate } from "gatsby"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  /* background: orange; */
`

// MARCH 11th most recent update regarding testing:
// Due to the update of utilizing a reducer from this component
// any tests for individual components will merely verify that they
// render appropriately given they're provided initial static data.

// For dynamically testing to see if updates/re-rendered components
// are occuring accordingly, all of those tests will need to occur
// using the BudgetCoordinator... as useReducer may only be used within
// a functional react component that returns JSX.
// The only thing I can think of that might be able to circumvent this
// is to pass in useReducer(reducer, initalState) to the reducer prop of the
// children components <- and even this seems unlikely to work.

const fetchBudgetData = async (setBudgetData, dispatchLogout) => {
  const result = await axios.get(endpoints.GET_ACCOUNT_URL)
  // status from server is still 200 in this case.
  // Could fix that.
  console.log("The get account result: ", result)
  if (result.data.message === "INVALID_SESSION") {
    // window.localStorage.removeItem("authenticated")
    dispatchLogout()
    navigate(`/app/login`)
  }
  // This is the status 200 case
  setBudgetData(result.data)
  // Any other status cases should render error UI message.
}

// ALso fetchBudgetData as props to facilitate testing as well?
const BudgetCoordinator = ({ dispatchLogout }) => {
  // Dependency injection these useBudgetReducer values to facilitate unit testing this component?
  const { state, dispatch, setBudgetData } = useBudgetReducer()
  const { data: budgetData } = state
  if (budgetData === null) {
    fetchBudgetData(setBudgetData, dispatchLogout)
  }

  const budgetDataIsAvailable = budgetData !== null && budgetData.budget
  return (
    <Container>
      <BudgetReducerProvider reducer={{ state, dispatch }}>
        {budgetDataIsAvailable && <BudgetDisplay budgetData={budgetData} />}
      </BudgetReducerProvider>
    </Container>
  )
}

export default BudgetCoordinator

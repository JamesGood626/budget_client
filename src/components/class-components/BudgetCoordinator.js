import React from "react"
import axios from "axios"
import styled from "styled-components"
import useBudgetReducer from "components/reducers/budget/BudgetReducer"
import BudgetReducerProvider from "components/reducers/budget/BudgetReducerProvider"
import BudgetDisplay from "components/class-components/BudgetDisplay"
import endpoints from "config/api_endpoints"

// only required while styling the application
import { accountDataWithUpdates } from "test_fixture_data"

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

const fetchBudgetData = async setBudgetData => {
  const result = await axios.get(endpoints.GET_ACCOUNT_URL)
  console.log("fetchBudgetData result: ", result.data)
  setBudgetData(result.data)
}

// ALso fetchBudgetData as props to facilitate testing as well?
const BudgetCoordinator = () => {
  // Dependency injection these useBudgetReducer values to facilitate unit testing this component?
  const { state, dispatch, setBudgetData } = useBudgetReducer()
  const { data: budgetData } = state
  if (budgetData === null) {
    // this is for dev only:
    // setBudgetData(accountDataWithUpdates)
    fetchBudgetData(setBudgetData)
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

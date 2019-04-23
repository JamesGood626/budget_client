import React from "react"
import styled from "styled-components"
import useBudgetReducer from "./BudgetReducer"
import BudgetReducerProvider from "../BudgetReducerProvider"
import GetAccountForm from "../functional-components/get-account-form"
import BudgetDisplay from "./BudgetDisplay"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  /* background: lime; */
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
const BudgetCoordinator = () => {
  // const [state, dispatch] = useReducer(reducer, null)
  // const setBudgetData = data => dispatch({ type: SET_STATE, payload: data })
  const { state, dispatch, setBudgetData } = useBudgetReducer()
  return (
    <Container>
      <BudgetReducerProvider reducer={{ state, dispatch }}>
        {state => (
          <BudgetDisplay
            budgetData={state.data}
            setBudgetData={setBudgetData}
          />
        )}
      </BudgetReducerProvider>
    </Container>
  )
}

export default BudgetCoordinator

import React from "react"
import styled from "styled-components"

const Container = styled.div`
  min-width: 16rem;
  max-width: 40vw;
`

// I won't actually show Nope.
// Will have some kind of animation loader...
// perhaps the grey div gradient placeholder anim.
const primaryAccountDetails = ({ budget }) => {
  return (
    <Container>
      {budget ? (
        <>
          <div>
            <h3>Total Balance:</h3>
            <p data-testid="account-balance">{budget.account_balance}</p>
          </div>
          <div>
            <h3>Current Budget:</h3>
            <p data-testid="current-budget">
              {!budget.budget_set ? "Set Budget" : budget.current_budget}
            </p>
          </div>
          <div>
            <h3>Budget Exceeded:</h3>
            <p data-testid="budget-exceeded">
              {!budget.budget_exceeded ? "You're Good" : "You're Fucked"}
            </p>
          </div>
        </>
      ) : (
        <h1>Nope</h1>
      )}
    </Container>
  )
}

export default primaryAccountDetails

import React from "react"
import styled from "styled-components"

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 5.4rem;
  width: ${props => props.theme.largeWidth};
  padding: 1.4rem 1rem 1.4rem 1rem;
  /* dark green text */
  color: ${props => props.theme.darkGreen};
  /* main white */
  background: ${props => props.theme.white};
  border-radius: 8px;
  box-shadow: 0px 2px 4px 0 rgba(0, 0, 0, 35%);

  h3 {
    font-size: ${props => props.theme.headerThreeLarge};
  }

  @media screen and (max-width: 500px) {
    padding: 0;
    width: ${props => props.theme.smallWidth};

    h3 {
      font-size: ${props => props.theme.headerThreeSmall};
    }

    p {
      font-size: ${props => props.theme.textSmall};
    }
  }

  @media screen and (min-width: 500px) and (max-width: 780px) {
    width: ${props => props.theme.mediumWidth};

    h3 {
      font-size: ${props => props.theme.headerThreeMedium};
    }

    p {
      font-size: ${props => props.theme.textMedium};
    }
  }

  div {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 3rem;
  }

  p {
    font-weight: bold;
  }

  #first-block:after {
    content: "";
    position: absolute;
    top: 0.3rem;
    left: 110%;
    width: 0.15rem;
    height: 3rem;
    opacity: 0.09;
    background: #979797;
  }

  #second-block:after {
    content: "";
    position: absolute;
    top: 0.3rem;
    left: 112%;
    width: 0.15rem;
    height: 3rem;
    opacity: 0.09;
    background: #979797;
  }

  @media screen and (max-width: 500px) {
    #first-block:after {
      left: 106%;
    }
    #second-block:after {
      left: 106%;
    }
  }

  .green-text {
    color: ${props => props.theme.lightGreen};
  }

  .red-text {
    color: ${props => props.theme.red};
  }

  .grey-text {
    color: ${props => props.theme.grey};
  }
`

// I won't actually show Nope.
// Will have some kind of animation loader...
// perhaps the grey div gradient placeholder anim.
const primaryAccountDetails = ({ budget }) => {
  if (!budget) {
    return null
  }
  const {
    account_balance,
    current_budget,
    budget_set,
    budget_exceeded,
  } = budget
  return (
    <Container>
      <div id="first-block">
        <h3>Total Balance:</h3>
        <p
          className={account_balance > 0 ? "green-text" : "red-text"}
          data-testid="account-balance"
        >
          ${account_balance}
        </p>
      </div>
      <div id="second-block">
        <h3>Current Budget:</h3>
        <p className="grey-text" data-testid="current-budget">
          {/* TODO: Make the "Set Budget" text be a button */}
          {!budget_set ? "Set Budget" : `$${current_budget}`}
        </p>
      </div>
      <div>
        <h3>Exceeded:</h3>
        <p
          className={!budget_exceeded ? "green-text" : "red-text"}
          data-testid="budget-exceeded"
        >
          {!budget_exceeded ? "You're Good" : "You're Fucked"}
        </p>
      </div>
    </Container>
  )
}

export default primaryAccountDetails

// {budget ? (
//   <>
//     <div>
//       <h3>Total Balance:</h3>
//       <p data-testid="account-balance">{budget.account_balance}</p>
//     </div>
//     <div>
//       <h3>Current Budget:</h3>
//       <p data-testid="current-budget">
//         {!budget.budget_set ? "Set Budget" : budget.current_budget}
//       </p>
//     </div>
//     <div>
//       <h3>Budget Exceeded:</h3>
//       <p data-testid="budget-exceeded">
//         {!budget.budget_exceeded ? "You're Good" : "You're Fucked"}
//       </p>
//     </div>
//   </>
// ) : (
//   <h1>Nope</h1>
// )}

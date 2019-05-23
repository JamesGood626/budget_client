import React, { useState } from "react"
import styled from "styled-components"
import Modal from "components/functional-components/expense-deposit-feature/modal"
import SetBudgetForm from "components/functional-components/account-budget-feature/set-budget-form"
import actions from "components/reducers/budget/budgetReducerActions"
import utils from "utils/currency"

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

  .account-detail-block {
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

  #second-block span {
    display: flex;
    align-items: center;
  }

  .set-budget-btn {
    font-size: 1rem;
    font-weight: bold;
    margin-left: 0.5rem;
    padding-bottom: 1.2rem;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50px;
    border: 2px solid ${props => props.theme.darkGreen};
    color: ${props => props.theme.darkGreen};
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

// TODO: Fix this so that it always appears from the top to bottom of the viewport (even when scrolled down the page....)
// for whatever reason this css isn't taking effect in the cypress view.
const FadedBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 50;
  background: #222;
  opacity: 0.5;
  width: 100vw;
  height: 100vh;
`

const primaryAccountDetails = ({
  budget,
  reducer: {
    dispatch,
    state: { data },
  },
}) => {
  const [modalToggled, setModalToggled] = useState({
    toggled: false,
    transactionType: null,
  })

  const toggleModal = () => {
    setModalToggled({ toggled: !modalToggled.toggled })
  }

  const setBudget = async data => {
    dispatch({
      type: actions.SET_BUDGET,
      payload: data,
    })
  }

  if (!budget) {
    return null
  }
  const {
    account_balance,
    current_budget,
    budget_set,
    budget_exceeded,
  } = budget
  const accountBalanceTextColor =
    account_balance > 0
      ? "green-text"
      : account_balance < 0
      ? "red-text"
      : "grey-text"
  return (
    <Container>
      <div id="first-block" className="account-detail-block">
        <h3>Total Balance:</h3>
        <p className={accountBalanceTextColor} data-testid="account-balance">
          {utils.formatCurrency(account_balance)}
        </p>
      </div>
      <div id="second-block" className="account-detail-block">
        <h3>Current Budget:</h3>
        <span>
          {!budget_set ? (
            <>
              <p className="grey-text" data-testid="current-budget">
                Set Budget
              </p>{" "}
              <button className="set-budget-btn" onClick={toggleModal}>
                +
              </button>
            </>
          ) : (
            `${utils.formatCurrency(current_budget)}`
          )}
        </span>
      </div>
      <div className="account-detail-block">
        <h3>Exceeded:</h3>
        <p
          className={!budget_exceeded ? "green-text" : "red-text"}
          data-testid="budget-exceeded"
        >
          {/* TODO: Change You're Fucked to contain the numerical amount which the budget was exceeded by. */}
          {!budget_exceeded ? "You're Good" : "You're Fucked"}
        </p>
      </div>
      {modalToggled.toggled && (
        <>
          <Modal toggleModal={toggleModal}>
            <SetBudgetForm
              toggleModal={toggleModal}
              dateData={{
                current_month: data.current_month,
                current_year: data.current_year,
              }}
              setBudget={setBudget}
            />
          </Modal>
          <FadedBackground />
        </>
      )}
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

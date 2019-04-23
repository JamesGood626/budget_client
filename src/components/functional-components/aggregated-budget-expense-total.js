import React from "react"
import styled from "styled-components"

const Section = styled.section`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 5.4rem;
  width: 32rem;
  padding: 1.4rem 1rem 1.4rem 1rem;
  /* dark green text */
  color: #1d470c;
  /* main white */
  background: #fff;
  border-radius: 8px;
  margin-bottom: 1.6rem;

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
    left: 11.4rem;
    width: 0.15rem;
    height: 3rem;
    opacity: 0.09;
    background: #979797;
  }

  .green-text {
    color: #54d423;
  }

  .red-text {
    color: #ff5e5e;
  }

  .grey-text {
    color: #979797;
  }
`

const aggregatedBudgetExpenseTotal = ({
  totals: { budgetTotal, unnecessaryExpensesTotal },
}) => {
  return (
    <Section>
      <div id="first-block" data-testid="budget-total">
        <h3>Aggregated Budget:</h3>
        <p className={budgetTotal > 0 ? "green-text" : "red-text"}>
          ${budgetTotal}
        </p>
      </div>
      <div data-testid="unnecessary-expense-total">
        <h3>Unnecessary Expense Total:</h3>
        <p className={unnecessaryExpensesTotal > 0 ? "green-text" : "red-text"}>
          ${unnecessaryExpensesTotal}
        </p>
      </div>
    </Section>
  )
}

export default aggregatedBudgetExpenseTotal

import React from "react"
import styled from "styled-components"

const Section = styled.section`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 5.4rem;
  width: 32rem;
  padding: 1.4rem 1rem 1.4rem 1rem;
  margin-bottom: 1.6rem;
  /* dark green text */
  color: #1d470c;
  /* main white */
  background: #fff;
  box-shadow: 0px 2px 4px 0 rgba(0, 0, 0, 35%);
  border-radius: 8px;

  @media screen and (max-width: 500px) {
    width: ${props => props.theme.smallWidth};

    h3 {
      font-size: ${props => props.theme.headerThreeSmall};
      padding-bottom: 0.1rem;
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
    left: 11.4rem;
    width: 0.15rem;
    height: 3rem;
    opacity: 0.09;
    background: #979797;
  }

  @media screen and (max-width: 500px) {
    #first-block:after {
      left: 78%;
    }
  }

  @media screen and (min-width: 500px) and (max-width: 780px) {
    #first-block:after {
      left: 110%;
    }
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

// Should move this into a utils folder file or something...
const getTextColor = val => {
  return val > 0 ? "green-text" : val < 0 ? "red-text" : "grey-text"
}

const aggregatedBudgetExpenseTotal = ({
  totals: { budgetTotal, unnecessaryExpensesTotal },
}) => {
  const budgetTotalTextColor = getTextColor(budgetTotal)
  const unnecessaryExpensesTotalTextColor = getTextColor(
    unnecessaryExpensesTotal
  )

  return (
    <Section>
      <div id="first-block" data-testid="budget-total">
        <h3>Aggregated Budget:</h3>
        <p className={budgetTotalTextColor}>${budgetTotal}</p>
      </div>
      <div data-testid="unnecessary-expense-total">
        <h3>Unnecessary Expense Total:</h3>
        <p className={unnecessaryExpensesTotalTextColor}>
          ${unnecessaryExpensesTotal}
        </p>
      </div>
    </Section>
  )
}

export default aggregatedBudgetExpenseTotal

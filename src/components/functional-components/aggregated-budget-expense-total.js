import React from "react"

const aggregatedBudgetExpenseTotal = ({
  totals: { budgetTotal, unnecessaryExpensesTotal },
}) => {
  return (
    <div>
      <div data-testid="budget-total">
        <h4>Budget Total:</h4>
        <p>{budgetTotal}</p>
      </div>
      <div data-testid="unnecessary-expense-total">
        <h4>Unnecessary Expense Total:</h4>
        <p>{unnecessaryExpensesTotal}</p>
      </div>
    </div>
  )
}

export default aggregatedBudgetExpenseTotal

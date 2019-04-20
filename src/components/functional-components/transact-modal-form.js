import React from "react"
import DepositInputs from "./depositInputs"
import expenseInputs from "./expenseInputs"

const transactModalForm = ({ transactionType }) => {
  return (
    <div>
      <h1 data-testid="transact-form">{transactionType}</h1>
      <form>
        {transactionType === "DEPOSIT" && DepositInputs}
        {transactionType === "EXPENSE" && expenseInputs}
      </form>
    </div>
  )
}

export default transactModalForm

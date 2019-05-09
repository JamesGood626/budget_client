import React from "react"
import DepositInputs from "components/functional-components/expense-deposit-feature/expense-deposit-inputs/deposit-inputs"
import ExpenseInputs from "components/functional-components/expense-deposit-feature/expense-deposit-inputs/expense-inputs"
import Form from "components/functional-components/foundational-components/form-styles"

const transactForm = ({ transactionType, toggleModal, dateData, transact }) => {
  return (
    <Form id="form">
      <div onClick={() => toggleModal("")}>X</div>
      {transactionType === "DEPOSIT" && (
        <DepositInputs
          dateData={dateData}
          transact={transact}
          toggleModal={toggleModal}
        />
      )}
      {transactionType === "EXPENSE" && (
        <ExpenseInputs
          dateData={dateData}
          transact={transact}
          toggleModal={toggleModal}
        />
      )}
    </Form>
  )
}

export default transactForm

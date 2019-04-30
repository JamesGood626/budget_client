import React from "react"
import DepositInputs from "./expense-deposit-inputs/deposit-inputs"
import ExpenseInputs from "./expense-deposit-inputs/expense-inputs"
import Form from "../foundational-components/form-styles"

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

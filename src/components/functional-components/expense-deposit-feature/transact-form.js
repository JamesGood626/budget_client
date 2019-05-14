import React from "react"
import styled from "styled-components"
import DepositInputs from "components/functional-components/expense-deposit-feature/expense-deposit-inputs/deposit-inputs"
import ExpenseInputs from "components/functional-components/expense-deposit-feature/expense-deposit-inputs/expense-inputs"
import Form from "components/functional-components/foundational-components/form-styles"
import ExitSvg from "components/functional-components/foundational-components/ExitSvg"

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2rem;
  height: 2rem;

  svg {
    width: 1.4rem;
    height: 1.4rem;
  }
`

const transactForm = ({ transactionType, toggleModal, dateData, transact }) => {
  return (
    <Form id="form">
      <Div onClick={() => toggleModal("")}>
        <ExitSvg />
      </Div>
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

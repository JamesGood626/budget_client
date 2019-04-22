import React from "react"
import styled from "styled-components"
import DepositInputs from "./depositInputs"
import ExpenseInputs from "./expenseInputs"

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100vw;
  height: 100vh;

  form {
    display: flex;
    flex-direction: column;
    height: 20rem;
    width: 18rem;
    padding: 2rem;
    background: #fff;
    border-radius: 8px;
  }
`

const transactModalForm = ({ transactionType, toggleModal }) => {
  return (
    <Container onClick={() => toggleModal("")}>
      {/* <h1 data-testid="transact-form">{transactionType}</h1> */}
      <form id="form">
        <div onClick={() => toggleModal("")}>X</div>
        {transactionType === "DEPOSIT" && <DepositInputs />}
        {transactionType === "EXPENSE" && <ExpenseInputs />}
      </form>
    </Container>
  )
}

export default transactModalForm

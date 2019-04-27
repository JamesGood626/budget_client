import React, { Component } from "react"
import styled from "styled-components"
import DepositInputs from "./expense-deposit-inputs/depositInputs"
import ExpenseInputs from "./expense-deposit-inputs/expenseInputs"
import Form from "./block-components/form-styles"

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

  div {
    background: orange;
  }
`

class TransactModalForm extends Component {
  componentDidMount = () => {
    this.setBodyStyle("hidden")
  }

  componentWillUnmount = () => {
    this.setBodyStyle("scroll")
  }

  setBodyStyle = styleType => {
    const [body] = document.getElementsByTagName("body")
    body.style.overflowY = styleType
  }

  handleCloseClick = (e, toggleModal) => {
    const { nodeName } = e.target
    console.log("THE NODE NAME: ", nodeName)
    const clickOutsideOfForm =
      nodeName !== "FORM" &&
      nodeName !== "SELECT" &&
      nodeName !== "INPUT" &&
      nodeName !== "LABEL" &&
      nodeName !== "BUTTON"
    if (clickOutsideOfForm) {
      toggleModal("")
    }
  }

  render() {
    const { transactionType, toggleModal, dateData, deposit } = this.props
    return (
      <Container onClick={e => this.handleCloseClick(e, toggleModal)}>
        <Form id="form">
          <div onClick={() => toggleModal("")}>X</div>
          {transactionType === "DEPOSIT" && (
            <DepositInputs dateData={dateData} deposit={deposit} />
          )}
          {transactionType === "EXPENSE" && (
            <ExpenseInputs dateData={dateData} />
          )}
        </Form>
      </Container>
    )
  }
}

export default TransactModalForm

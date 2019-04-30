import React, { Component } from "react"
import styled from "styled-components"
import DepositInputs from "./expense-deposit-inputs/deposit-inputs"
import ExpenseInputs from "./expense-deposit-inputs/expense-inputs"
import Form from "../foundational-components/form-styles"

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

  .warning-container {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    position: absolute;
    margin: 0 auto;
    margin-left: -0.8rem;
    padding: 1rem 1rem;
    width: 18rem;
    height: 18rem;
    background: #fff;

    p {
      font-size: 1.2rem;
    }

    .warning-btn-container {
      display: flex;
      justify-content: space-around;
    }
  }
`

class TransactModalForm extends Component {
  componentDidMount = () => {
    this.setBodyStyle("hidden")
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("Component updated: ", this.state)
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
    const { transactionType, toggleModal, dateData, transact } = this.props
    return (
      <Container onClick={e => this.handleCloseClick(e, toggleModal)}>
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
      </Container>
    )
  }
}

export default TransactModalForm

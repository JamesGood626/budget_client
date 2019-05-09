import React, { useState } from "react"
import axios from "axios"
import Form from "components/functional-components/foundational-components/form-styles"
import Button from "components/functional-components/foundational-components/button"
import TransactionWarning from "components/functional-components/expense-deposit-feature/transaction-warning"
import endpoints from "config/api_endpoints"

const setBudgetForm = ({ toggleModal, setBudget, dateData }) => {
  const [warningVisible, setWarningVisible] = useState(false)
  const [budgetAmount, setBudgetAmount] = useState({ value: "", err: false })

  const changeBudgetAmount = e => {
    const value = e.target.value
    const valueIsNumber = !isNaN(value)
    if (valueIsNumber) {
      setBudgetAmount({ err: true })
    }
    setBudgetAmount({ value, err: false })
  }

  const handleShowWarning = e => {
    e.preventDefault()
    setWarningVisible(true)
  }

  // Is a reimplementation of a function that could be made more genetic
  // that's located inside of deposit-inputs.js and expense-inputs.js
  const postSetBudget = async (dateData, setBudget, toggleModal) => {
    const setBudgetResult = await axios.post(endpoints.SET_BUDGET_URL, {
      budget_amount: budgetAmount.value,
      ...dateData,
    })
    if (!setBudgetResult) {
      // How to handle this so that user may receive notification of post failure?
      return "It failed..."
    }
    await setBudget("SET_BUDGET", setBudgetResult, dateData)
    toggleModal("")
  }

  const handleSubmit = async (e, dateData, setBudget, toggleModal) => {
    e.preventDefault()
    postSetBudget(dateData, setBudget, toggleModal)
  }

  return (
    <>
      <Form id="form">
        <h1>Damn</h1>
        <div onClick={() => toggleModal("")}>X</div>
        <input
          id="set-budget-input"
          type="text"
          value={budgetAmount.value}
          onChange={changeBudgetAmount}
        />
        <Button
          onClick={e => handleShowWarning(e)}
          type="submit"
          className="set-budget-submit-btn"
          dataTestId="setBudgetBtn"
          radius={25}
          shadow={true}
          padding={[0.8, 3.2]}
          minHeight={3}
          topColor="#46FF90"
          bottomColor="#20E131"
          fontColor="#fff"
        >
          Submit
        </Button>
      </Form>
      {warningVisible && (
        <TransactionWarning
          message="Are you sure? You may not reset budget after it has been set."
          handleSubmit={e => handleSubmit(e, dateData, setBudget, toggleModal)}
          toggleModal={toggleModal}
        />
      )}
    </>
  )
}

export default setBudgetForm

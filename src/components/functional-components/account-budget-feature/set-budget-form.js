import React, { useState } from "react"
import axios from "axios"
import styled from "styled-components"
import Form from "components/functional-components/foundational-components/form-styles"
import Button from "components/functional-components/foundational-components/button"
import TransactionWarning from "components/functional-components/expense-deposit-feature/transaction-warning"
import endpoints from "config/api_endpoints"
import utils from "utils/currency"
import ExitSvg from "components/functional-components/foundational-components/ExitSvg"
import handleLabelAnimation from "components/functional-components/expense-deposit-feature/expense-deposit-inputs/label-anim-helper"

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

const setBudgetForm = ({ toggleModal, setBudget, dateData }) => {
  const [warningVisible, setWarningVisible] = useState(false)
  const [budgetAmount, setBudgetAmount] = useState({ value: "", err: false })
  const [budgetAmountFocused, setBudgetAmountFocused] = useState(false)

  const changeBudgetAmount = e => {
    const value = e.target.value
    const valueIsNumber = !isNaN(value)
    if (valueIsNumber) {
      setBudgetAmount({ err: true })
    }
    const newValue = utils.convertStringToCurrency(value)
    setBudgetAmount({ value: newValue, err: false })
  }

  const handleShowWarning = e => {
    e.preventDefault()
    setWarningVisible(true)
  }

  // Is a reimplementation of a function that could be made more genetic
  // that's located inside of deposit-inputs.js and expense-inputs.js
  const postSetBudget = async (dateData, setBudget, toggleModal) => {
    const setBudgetResult = await axios.post(endpoints.SET_BUDGET_URL, {
      budget_amount: utils.convertCurrencyToInt(budgetAmount.value),
      ...dateData,
    })
    if (!setBudgetResult) {
      // How to handle this so that user may receive notification of post failure?
      return "It failed..."
    }
    await setBudget(setBudgetResult.data)
    toggleModal("")
  }

  const handleSubmit = async (e, dateData, setBudget, toggleModal) => {
    e.preventDefault()
    postSetBudget(dateData, setBudget, toggleModal)
  }

  return (
    <>
      <Form id="form">
        <Div onClick={() => toggleModal("")}>
          <ExitSvg />
        </Div>
        <label
          htmlFor="income-source"
          className={budgetAmountFocused ? "input-active" : null}
        >
          Budget Amount
        </label>
        <input
          id="set-budget-input"
          type="text"
          value={budgetAmount.value}
          onChange={changeBudgetAmount}
          onFocus={e =>
            handleLabelAnimation(e, setBudgetAmountFocused, budgetAmountFocused)
          }
          onBlur={e =>
            handleLabelAnimation(e, setBudgetAmountFocused, budgetAmountFocused)
          }
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

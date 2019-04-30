import React, { useState } from "react"
import axios from "axios"
import endpoints from "../../../../config/api_endpoints"
import Button from "../../foundational-components/button"
import TransactionWarning from "../transaction-warning"
import handleLabelAnimation from "./label-anim-helper"
import {
  Select,
  Label,
  LabelTextSpan,
} from "../../filter-dropdowns/dropdown-styles"

const expenseInputs = ({ dateData, transact, toggleModal }) => {
  const [warningVisible, setWarningVisible] = useState(false)
  const [category, setCategory] = useState("NECESSARY_EXPENSE")
  const [expense, setExpense] = useState({ value: "", err: false })
  const [amount, setAmount] = useState({ value: "", err: false })
  const [expenseFocused, setExpenseFocused] = useState(false)
  const [amountFocused, setAmountFocused] = useState(false)

  const changeExpense = e => {
    const value = e.target.value
    const valueIsNumber = !isNaN(value)
    if (valueIsNumber) {
      setExpense({ err: true })
    }
    setExpense({ value, err: false })
  }

  const changeAmount = e => {
    const value = e.target.value
    const valueIsString = isNaN(value)
    if (valueIsString) {
      setAmount({ err: true })
    }
    setAmount({ value, err: false })
  }

  const handleShowWarning = e => {
    e.preventDefault()
    setWarningVisible(true)
  }

  const handleSetCategory = e => setCategory(e.target.value)

  const handleSubmit = async (e, dateData, transact, toggleModal) => {
    e.preventDefault()
    const EXPENSE_URL =
      category === "NECESSARY_EXPENSE"
        ? endpoints.NECESSARY_EXPENSE_URL
        : endpoints.UNNECESSARY_EXPENSE_URL
    postExpense(EXPENSE_URL, category, dateData, transact, toggleModal)
  }

  const postExpense = async (
    expense_url,
    type,
    dateData,
    transact,
    toggleModal
  ) => {
    const expendResult = await axios.post(expense_url, {
      expense: expense.value,
      amount: parseInt(amount.value),
      ...dateData,
    })
    if (!expendResult) {
      // How to handle this so that user may receive notification of post failure?
      return "It failed..."
    }
    await transact(type, expendResult, dateData)
    toggleModal("")
  }

  return (
    <>
      <Label htmlFor="expense-type-select" modalSelect>
        <Select
          id="expense-type-select"
          data-testid="expense-type-select"
          onChange={handleSetCategory}
          defaultValue="NECESSARY_EXPENSE"
        >
          <option value="NECESSARY_EXPENSE">Necessary Expense</option>
          <option value="UNNECESSARY_EXPENSE">Unnecessary Expense</option>
        </Select>
        <LabelTextSpan>
          <span>&#9660;</span>
          {category === "NECESSARY_EXPENSE"
            ? "Necessary Expense"
            : "Unnecessary Expense"}
        </LabelTextSpan>
      </Label>
      <label
        htmlFor="expense"
        className={expenseFocused ? "input-active" : null}
      >
        Expense
      </label>
      <input
        id="expense"
        type="text"
        value={expense.value}
        onChange={changeExpense}
        onFocus={e =>
          handleLabelAnimation(e, setExpenseFocused, expenseFocused)
        }
        onBlur={e => handleLabelAnimation(e, setExpenseFocused, expenseFocused)}
      />
      <label htmlFor="amount" className={amountFocused ? "input-active" : null}>
        Amount
      </label>
      <input
        id="amount"
        type="text"
        value={amount.value}
        onChange={changeAmount}
        onFocus={e => handleLabelAnimation(e, setAmountFocused, amountFocused)}
        onBlur={e => handleLabelAnimation(e, setAmountFocused, amountFocused)}
      />
      <Button
        onClick={e => handleShowWarning(e)}
        type="submit"
        className="expense-submit-btn"
        dataTestId="expenseBtn"
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
      {warningVisible && (
        <TransactionWarning
          message="This expense may not be deleted after creation"
          handleSubmit={handleSubmit}
          dateData={dateData}
          transact={transact}
          toggleModal={toggleModal}
        />
      )}
    </>
  )
}

export default expenseInputs

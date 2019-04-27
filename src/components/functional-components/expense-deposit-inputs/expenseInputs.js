import React, { useState } from "react"
import axios from "axios"
import endpoints from "../../../config/api_endpoints"
import Button from "../button"
import handleLabelAnimation from "./label-anim-helper"
import {
  Select,
  Label,
  LabelTextSpan,
} from "../filter-dropdowns/dropdown-styles"

const expenseInputs = ({ dateData }) => {
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

  const handleSetCategory = e => setCategory(e.target.value)

  const handleSubmit = (e, dateData) => {
    e.preventDefault()
    const EXPENSE_URL =
      category === "NECESSARY_EXPENSE"
        ? endpoints.NECESSARY_EXPENSE_URL
        : endpoints.UNNECESSARY_EXPENSE_URL
    axios.post(EXPENSE_URL, {
      expense: expense.value,
      expense_amount: amount.value,
      ...dateData,
    })
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
          {/* TODO: Text needs to be the option selected from the dropdown */}
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
        onClick={e => handleSubmit(e, dateData)}
        type="submit"
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
    </>
  )
}

export default expenseInputs

import React, { useState } from "react"
import axios from "axios"
import endpoints from "../../config/api_endpoints"

const expenseInputs = () => {
  const [category, setCategory] = useState("NECESSARY_EXPENSE")
  const [expense, setExpense] = useState({ value: "", err: false })
  const [amount, setAmount] = useState({ value: "", err: false })

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

  const handleSubmit = e => {
    e.preventDefault()
    const EXPENSE_URL =
      category === "NECESSARY_EXPENSE"
        ? endpoints.NECESSARY_EXPENSE_URL
        : endpoints.UNNECESSARY_EXPENSE_URL
    axios.post(EXPENSE_URL, {
      expense: expense.value,
      expense_amount: amount.value,
    })
  }

  return (
    <>
      <select defaultValue="NECESSARY_EXPENSE" onChange={handleSetCategory}>
        <option value="NECESSARY_EXPENSE">Necessary Expense</option>
        <option value="UNNECESSARY_EXPENSE">Unnecessary Expense</option>
      </select>
      <label id="expense" htmlFor="expense">
        Expense
      </label>
      <input type="text" value={expense.value} onChange={changeExpense} />
      <label htmlFor="amount">Amount</label>
      <input id="amount" type="text" value={amount} onChange={changeAmount} />
      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
    </>
  )
}

export default expenseInputs

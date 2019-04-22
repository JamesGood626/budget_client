import React, { useState } from "react"
import axios from "axios"
import endpoints from "../../config/api_endpoints"

const depositInputs = () => {
  const [incomeSource, setIncomeSource] = useState({ value: "", err: false })
  const [depositAmount, setDepositAmount] = useState({ value: "", err: false })

  const changeIncomeSource = e => {
    const value = e.target.value
    const valueIsNumber = !isNaN(value)
    if (valueIsNumber) {
      setIncomeSource({ err: true })
    }
    setIncomeSource({ value, err: false })
  }

  const changeDepositAmount = e => {
    const value = e.target.value
    const valueIsString = isNaN(value)
    if (valueIsString) {
      setDepositAmount({ err: true })
    }
    setDepositAmount({ value, err: false })
  }

  const handleSubmit = e => {
    e.preventDefault()
    axios.post(endpoints.DEPOSIT_URL, {
      income_source: incomeSource.value,
      deposit_amount: depositAmount.value,
    })
  }

  return (
    <>
      <label id="income-source" htmlFor="income-source">
        Income Source
      </label>
      <input
        type="text"
        value={incomeSource.value}
        onChange={changeIncomeSource}
      />
      <label htmlFor="deposit-amount">Deposit Amount</label>
      <input
        id="deposit-amount"
        type="text"
        value={depositAmount}
        onChange={changeDepositAmount}
      />
      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
    </>
  )
}

export default depositInputs

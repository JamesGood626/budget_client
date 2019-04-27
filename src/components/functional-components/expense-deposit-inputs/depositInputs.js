import React, { useState } from "react"
import axios from "axios"
import endpoints from "../../../config/api_endpoints"
import Button from "../button"
import handleLabelAnimation from "./label-anim-helper"

// NOTE:
// DONT FORGET THAT YOU NEED ACCESS TO THE CURRENT MONTH AND CURRENT
// YEAR OFF OF THE MAIN DATA STRUCTURE THAT'S RETURNED FROM THE INITIAL
// GET ACCOUNT REQUEST.

const depositInputs = ({ dateData, deposit }) => {
  const [incomeSource, setIncomeSource] = useState({ value: "", err: false })
  const [depositAmount, setDepositAmount] = useState({ value: "", err: false })
  const [incomeSourceFocused, setIncomeSourceFocused] = useState(false)
  const [depositAmountFocused, setDepositAmountFocused] = useState(false)

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

  const handleSubmit = async (e, dateData, deposit) => {
    e.preventDefault()
    console.log("DEPOSIT POST!")
    const depositResult = await axios.post(endpoints.DEPOSIT_URL, {
      income_source: incomeSource.value,
      deposit_amount: parseInt(depositAmount.value),
      ...dateData,
    })
    if (!depositResult) {
      // How to handle this so that user may receive notification of post failure?
      return
    }
    console.log("CALLING DEPOSIT")
    await deposit(depositResult, dateData)
  }

  return (
    <>
      <label
        htmlFor="income-source"
        className={incomeSourceFocused ? "input-active" : null}
      >
        Income Source
      </label>
      <input
        id="income-source"
        type="text"
        value={incomeSource.value}
        onChange={changeIncomeSource}
        onFocus={e =>
          handleLabelAnimation(e, setIncomeSourceFocused, incomeSourceFocused)
        }
        onBlur={e =>
          handleLabelAnimation(e, setIncomeSourceFocused, incomeSourceFocused)
        }
      />
      <label
        htmlFor="deposit-amount"
        className={depositAmountFocused ? "input-active" : null}
      >
        Deposit Amount
      </label>
      <input
        id="deposit-amount"
        type="text"
        value={depositAmount.value}
        onChange={changeDepositAmount}
        onFocus={e =>
          handleLabelAnimation(e, setDepositAmountFocused, depositAmountFocused)
        }
        onBlur={e =>
          handleLabelAnimation(e, setDepositAmountFocused, depositAmountFocused)
        }
      />
      <Button
        onClick={e => handleSubmit(e, dateData, deposit)}
        type="submit"
        dataTestId="depositBtn"
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

export default depositInputs

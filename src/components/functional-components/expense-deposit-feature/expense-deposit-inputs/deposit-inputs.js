import React, { useState } from "react"
import axios from "axios"
import endpoints from "config/api_endpoints"
import Button from "components/functional-components/foundational-components/button"
import TransactionWarning from "components/functional-components/expense-deposit-feature/transaction-warning"
import handleLabelAnimation from "components/functional-components/expense-deposit-feature/expense-deposit-inputs/label-anim-helper"
import utils from "utils/currency"
import { changeAmount } from "./helpers"

const depositInputs = ({ dateData, transact, toggleModal }) => {
  const [warningVisible, setWarningVisible] = useState(false)
  const [incomeSource, setIncomeSource] = useState({ value: "", err: false })
  const [depositAmount, setDepositAmount] = useState({ value: "", err: false })
  const [incomeSourceFocused, setIncomeSourceFocused] = useState(false)
  const [depositAmountFocused, setDepositAmountFocused] = useState(false)

  const changeIncomeSource = e => {
    let err = false
    const value = e.target.value
    const valueIsNumber = !isNaN(value)
    if (valueIsNumber) {
      err = true
    }
    setIncomeSource({ value, err })
  }

  const changeDepositAmount = e =>
    changeAmount(e.target.value, setDepositAmount)

  const handleSubmit = async (e, dateData, transact, toggleModal) => {
    e.preventDefault()
    postDeposit(dateData, transact, toggleModal)
  }

  const handleShowWarning = e => {
    e.preventDefault()
    setWarningVisible(true)
  }

  // This can be made more generic...
  const postDeposit = async (dateData, transact, toggleModal) => {
    const depositResult = await axios.post(endpoints.DEPOSIT_URL, {
      income_source: incomeSource.value,
      deposit_amount: utils.convertCurrencyToInt(depositAmount.value),
      ...dateData,
    })
    if (!depositResult) {
      // TODO: (future improvement) -> use a hook to display error UI if post fails/otherwise close modal
      return "It failed..."
    }
    await transact("DEPOSIT", depositResult, dateData)
    toggleModal("")
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
      {depositAmount.err && (
        <p className="amount--invalid">{depositAmount.err}</p>
      )}
      <Button
        onClick={e => handleShowWarning(e)}
        className="deposit-submit-btn"
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
      {warningVisible && (
        <TransactionWarning
          message="This deposit may not be deleted after creation"
          handleSubmit={e => handleSubmit(e, dateData, transact, toggleModal)}
          toggleModal={toggleModal}
        />
      )}
    </>
  )
}

export default depositInputs

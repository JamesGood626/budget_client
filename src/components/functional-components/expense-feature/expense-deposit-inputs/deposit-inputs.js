import React, { useState } from "react"
import axios from "axios"
import endpoints from "../../../../config/api_endpoints"
import Button from "../../button"
import TransactionWarning from "../transaction-warning"
import handleLabelAnimation from "./label-anim-helper"

const depositInputs = ({ dateData, transact, toggleModal }) => {
  const [warningVisible, setWarningVisible] = useState(false)
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

  const handleSubmit = async (e, dateData, transact, toggleModal) => {
    e.preventDefault()
    postDeposit(dateData, transact, toggleModal)
  }

  const handleShowWarning = e => {
    e.preventDefault()
    setWarningVisible(true)
  }

  const postDeposit = async (dateData, transact, toggleModal) => {
    const depositResult = await axios.post(endpoints.DEPOSIT_URL, {
      income_source: incomeSource.value,
      deposit_amount: parseInt(depositAmount.value),
      ...dateData,
    })
    if (!depositResult) {
      // How to handle this so that user may receive notification of post failure?
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
          handleSubmit={handleSubmit}
          dateData={dateData}
          transact={transact}
          toggleModal={toggleModal}
        />
      )}
    </>
  )
}

export default depositInputs

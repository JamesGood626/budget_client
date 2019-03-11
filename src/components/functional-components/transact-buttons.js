import React from "react"
import axios from "axios"
import { BUDGET_API } from "../../config"

// if you add the IN_PROGRESS dispatch then you'll need more than just dispatch here.
const transactButtons = ({ reducer: { dispatch } }) => {
  console.log("THE DISPATCH: ", dispatch)
  // similar function for expense.
  // The only things different would be the post URL and the dispatch type.
  const deposit = async params => {
    // API should return true/false only to indicate if deposit was successful
    // dispatch({type: IN_PROGRESS }) for loading indicator
    const depositResult = await axios.post(`${BUDGET_API}/deposit`, params)
    if (!depositResult) {
      // How to handle this so that user may receive notification of post failure?
      return
    }
    dispatch({ type: "DEPOSIT", payload: params })
  }

  // Clicking either of these buttons should open an appropriate modal
  // which will enable the user to enter deposit_type/expense_type and amount
  return (
    <div>
      <button data-testid="deposit-btn" onClick={() => console.log("Deposit")}>
        Deposit
      </button>
      <button onClick={() => console.log("Expense")}>Expense</button>
    </div>
  )
}

export default transactButtons

import React, { useState } from "react"
import axios from "axios"
import TransactModalForm from "./transact-modal-form"
import { BUDGET_API } from "../../config"
import {
  DEPOSIT,
  NECESSARY_EXPENSE,
  UNNECESSARY_EXPENSE,
  TOGGLE_IN_PROGRESS,
} from "../budgetReducerActions"

// For whatever reason... DEPOSIT and the rest of the constants are undefined when running tests
// Just going to pass in plain strings for now to the toggleModal function calls
// console.log("DEPOSIT: ", DEPOSIT)

// Generalizing the logic to accomodate deposit, necessary, and unnecessary.
// const transact = (category, ) => {

//   dispatch({ type: category, payload: params })
// }

// if you add the IN_PROGRESS dispatch then you'll need more than just dispatch here.
const transactButtons = ({ reducer: { dispatch } }) => {
  const [modalToggled, setModalToggled] = useState({
    toggled: false,
    transactionType: null,
  })
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
  const toggleModal = type => {
    setModalToggled({ toggled: !modalToggled, transactionType: type })
  }
  // Clicking either of these buttons should open an appropriate modal
  // which will enable the user to enter deposit_type/expense_type and amount
  //////////
  // TODO //
  //////////
  // This is where the tests are failing... must have left off here last time.
  // 1. Draw a diagram to determine the component tree flow.
  // 2. Add signup/login/signout aspects of the app.
  // 3. Handle user interaction flow for deposit/necessary_expense/unnecessary_expense
  //    -> This will be handled in the modal components which get toggled below.
  return (
    <div>
      {/* Need to open modals onClick with forms for adding the transactions */}
      <button data-testid="deposit-btn" onClick={() => toggleModal("DEPOSIT")}>
        Deposit
      </button>
      <button onClick={() => toggleModal("NECESSARY_EXPENSE")}>
        Necessary Expense
      </button>
      <button onClick={() => toggleModal("UNNECESSARY_EXPENSE")}>
        Unnecessary Expense
      </button>
      {modalToggled && (
        <TransactModalForm transactionType={modalToggled.transactionType} />
      )}
    </div>
  )
}

// Create modals which will house the form for creating a deposit/unnecessary/necessary
// Which url/html that is used will be determined by a constant which will be passed down as props to the modal

export default transactButtons

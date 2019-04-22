import React, { useState } from "react"
import axios from "axios"
import styled from "styled-components"
import TransactModalForm from "./transact-modal-form"
import Button from "./button"
import endpoints from "../../config/api_endpoints"
import {
  DEPOSIT,
  NECESSARY_EXPENSE,
  UNNECESSARY_EXPENSE,
  TOGGLE_IN_PROGRESS,
} from "../budgetReducerActions"

const FadedBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 50;
  background: #222;
  opacity: 0.5;
  width: 100vw;
  height: 100vh;
`

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
    const depositResult = await axios.post(endpoints.DEPOSIT, params)
    if (!depositResult) {
      // How to handle this so that user may receive notification of post failure?
      return
    }
    dispatch({ type: "DEPOSIT", payload: params })
  }
  const toggleModal = type => {
    setModalToggled({ toggled: !modalToggled.toggled, transactionType: type })
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
      <Button
        data-testid="deposit-btn"
        onClick={() => toggleModal("DEPOSIT")}
        radius={25}
        shadow={true}
        padding={[1, 3.2]}
        minHeight={3}
        topColor="#46FF90"
        bottomColor="#20E131"
      >
        Deposit
      </Button>
      <Button
        onClick={() => toggleModal("EXPENSE")}
        radius={25}
        shadow={true}
        padding={[1, 3.2]}
        minHeight={3}
        topColor="#FF7878"
        bottomColor="#FF5E5E"
      >
        Expense
      </Button>
      {/* <button onClick={() => toggleModal("UNNECESSARY_EXPENSE")}>
        Unnecessary Expense
      </button> */}
      {modalToggled.toggled && (
        <>
          <TransactModalForm
            transactionType={modalToggled.transactionType}
            toggleModal={toggleModal}
          />
          <FadedBackground />
        </>
      )}
    </div>
  )
}

// Create modals which will house the form for creating a deposit/unnecessary/necessary
// Which url/html that is used will be determined by a constant which will be passed down as props to the modal

export default transactButtons

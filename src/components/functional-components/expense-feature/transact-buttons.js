import React, { useState } from "react"
import axios from "axios"
import styled from "styled-components"
import TransactModalForm from "./transact-modal-form"
import Button from "../button"
// import endpoints from "../../../config/api_endpoints"
import actions from "../../reducers/budget/budgetReducerActions"

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-bottom: 1rem;

  @media screen and (max-width: 500px) {
    width: ${props => props.theme.smallWidth};
  }

  @media screen and (min-width: 500px) and (max-width: 780px) {
    width: ${props => props.theme.mediumWidth};
  }
`

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

// if you add the IN_PROGRESS dispatch then you'll need more than just dispatch here. (To facilitate a loading animation,
// will more than likely add this)
const transactButtons = ({
  reducer: {
    dispatch,
    state: { data },
  },
}) => {
  const [modalToggled, setModalToggled] = useState({
    toggled: false,
    transactionType: null,
  })

  const transact = async (type, result, dateData) => {
    dispatch({
      type,
      payload: { result, ...dateData },
    })
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
    <Container>
      {/* Need to open modals onClick with forms for adding the transactions */}
      <Button
        data-testid="deposit-btn"
        className="deposit-btn"
        onClick={() => toggleModal("DEPOSIT")}
        radius={25}
        shadow={true}
        padding={[0.8, 3.2]}
        minHeight={3}
        topColor="#46FF90"
        bottomColor="#20E131"
      >
        Deposit
      </Button>
      <Button
        className="expense-btn"
        onClick={() => toggleModal("EXPENSE")}
        radius={25}
        shadow={true}
        padding={[0.8, 3.2]}
        minHeight={3}
        topColor="#FF7878"
        bottomColor="#FF5E5E"
      >
        Expense
      </Button>
      {modalToggled.toggled && (
        <>
          <TransactModalForm
            transactionType={modalToggled.transactionType}
            toggleModal={toggleModal}
            dateData={{
              current_month: data.current_month,
              current_year: data.current_year,
            }}
            transact={transact}
          />
          <FadedBackground />
        </>
      )}
    </Container>
  )
}

// Create modals which will house the form for creating a deposit/unnecessary/necessary
// Which url/html that is used will be determined by a constant which will be passed down as props to the modal

export default transactButtons

import React from "react"
import axios from "axios"
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
  debugDOM,
} from "react-testing-library"
import BudgetCoordinator from "../../class-components/BudgetCoordinator"
import { changeInputValueAndLoop } from "../../../test_helpers"
import { BUDGET_API } from "../../../config"
// import { initialGetAccountData } from "../../test_fixture_data"

// this adds custom jest matchers from jest-dom
import "jest-dom/extend-expect"

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup)

jest.mock("axios")
// const mockCallback = jest.fn()

// The below is necessary setup in order to get the TransactButtons to be available...
// Taking this approach because it's the only valid way that I know of at the moment to have
// a reducer available in order to facilitate state updates via dispatching actions to the reducer.
const setup = (getByTestId, getByLabelText, fireEvent) => {
  const inputsList = [
    {
      labelText: "Account Name",
      newInputValue: "Primary",
    },
  ]
  changeInputValueAndLoop(getByLabelText, fireEvent, inputsList)

  fireEvent.click(getByTestId("getAccountSubmitBtn"))
}

test("BudgetCoordinator's child Component GetAccountForm's submit action calls it's updateBudgetData callback function with the retrieved budgetData from API.", async done => {
  const { getByTestId, getByLabelText, debug } = render(<BudgetCoordinator />)
  setup(getByTestId, getByLabelText, fireEvent)

  const depositBtn = await waitForElement(() => getByTestId("deposit-btn"))

  fireEvent.click(depositBtn)

  const transactForm = await waitForElement(() => getByTestId("transact-form"))

  // TODO -> determine where I last left off since this was the only failing test when I put in a different string.
  expect(transactForm).toHaveTextContent("DEPOSIT")
  done()
})

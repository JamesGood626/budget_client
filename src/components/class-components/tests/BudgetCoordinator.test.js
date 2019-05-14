import React from "react"
import axios from "axios"
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
  debugDOM,
} from "react-testing-library"
import BudgetCoordinator from "components/class-components/BudgetCoordinator"
import { initialGetAccountData } from "test_fixture_data"
import { changeInputValueAndLoop } from "test_helpers"

// this adds custom jest matchers from jest-dom
import "jest-dom/extend-expect"

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup)

// jest.mock("axios")
// const mockCallback = jest.fn()

test("1+1 = 2", () => {
  expect(1 + 1).toBe(2)
})

// Just keeping this around to reference for later.
// test("BudgetCoordinator's child Component GetAccountForm's submit action calls it's updateBudgetData callback function with the retrieved budgetData from API.", async done => {
//   const { getByTestId, getByLabelText, debug } = render(<BudgetCoordinator />)

//   const inputsList = [
//     {
//       labelText: "Account Name",
//       newInputValue: "Primary",
//     },
//   ]
//   changeInputValueAndLoop(getByLabelText, fireEvent, inputsList)

//   const getSpy = jest.spyOn(axios, "get")
//   fireEvent.click(getByTestId("getAccountSubmitBtn"))
//   expect(getSpy).toHaveBeenCalledTimes(1)
//   expect(getSpy).toHaveBeenCalledWith(`${BUDGET_API}/get-account`, {
//     accountName: "Primary",
//   })
//   const accountBalance = await waitForElement(() =>
//     getByTestId("account-balance")
//   )
//   const currentBudget = await waitForElement(() =>
//     getByTestId("current-budget")
//   )
//   const budgetExceeded = await waitForElement(() =>
//     getByTestId("budget-exceeded")
//   )
//   const depositBtn = await waitForElement(() => getByTestId("deposit-btn"))

//   expect(accountBalance).toHaveTextContent("0")
//   expect(currentBudget).toHaveTextContent("Set Budget")
//   expect(budgetExceeded).toHaveTextContent("You're Good")
//   expect(depositBtn).toHaveTextContent("Deposit")

//   done()
// })

// export const inputChangeTestCase = async (inputField, getByLabelText, value) => {
//   let input;
//   input = getByLabelText(inputField);
//   expect(input.value).toBe('');
//   fireEvent.change(input, {
//     target: { value }
//   });
//   input = await waitForElement(() => getByLabelText(inputField));
//   expect(input.value).toBe(value);
// };

// export const inputChange = async (inputField, getByLabelText, value) => {
//   const input = getByLabelText(inputField);
//   fireEvent.change(input, {
//     target: { value }
//   });
// };

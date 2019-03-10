import React from "react"
import axios from "axios"
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
  debugDOM,
} from "react-testing-library"
import BudgetDisplay from "../BudgetDisplay"
import { initialGetAccountData } from "../../../test_fixture_data"
// import { inputChangeTestCase, inputChange } from "./helpers"

// this adds custom jest matchers from jest-dom
import "jest-dom/extend-expect"

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup)

jest.mock("axios")

// test("1+1 = 2", () => {
//   expect(1 + 1).toBe(2)
// })

test("BudgetDisplay renders with retrieved data from budget app API.", async done => {
  const { getByTestId, debug } = render(
    <BudgetDisplay budgetData={initialGetAccountData} />
  )
  debug()
  const accountBalance = await waitForElement(() =>
    getByTestId("account-balance")
  )
  const currentBudget = await waitForElement(() =>
    getByTestId("current-budget")
  )
  const budgetExceeded = await waitForElement(() =>
    getByTestId("budget-exceeded")
  )
  expect(accountBalance).toHaveTextContent("0")
  expect(currentBudget).toHaveTextContent("Set Budget")
  expect(budgetExceeded).toHaveTextContent("You're Good")
  done()
})

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

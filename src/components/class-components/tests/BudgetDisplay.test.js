import React from "react"
import axios from "axios"
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
  debugDOM,
} from "react-testing-library"
import BudgetReducerProvider from "components/reducers/budget/BudgetReducerProvider"
import useBudgetReducer from "components/reducers/budget/BudgetReducer"
import BudgetDisplay from "components/class-components/BudgetDisplay"
import { initialStateWithoutTransactions } from "test_fixture_data"
// import { inputChangeTestCase, inputChange } from "./helpers"

// this adds custom jest matchers from jest-dom
import "jest-dom/extend-expect"

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup)

// jest.mock("axios")

// test("1+1 = 2", () => {
//   expect(1 + 1).toBe(2)
// })

test("BudgetDisplay renders with retrieved data from budget app API.", async done => {
  const { getByTestId, debug } = render(
    <BudgetReducerProvider
      reducer={{ state: initialStateWithoutTransactions, dispatch: () => true }}
    >
      <BudgetDisplay budgetData={initialStateWithoutTransactions.data} />
    </BudgetReducerProvider>
  )
  // debug()
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

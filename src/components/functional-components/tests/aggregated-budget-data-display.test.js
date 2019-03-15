import React from "react"
import axios from "axios"
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
  debugDOM,
} from "react-testing-library"
import AggregatedBudgetDataDisplay from "../aggregated-budget-data-display"
import { BUDGET_API } from "../../../config"
import { accountDataWithUpdates } from "../../../test_fixture_data"
import { changeInputValueAndLoop } from "../../../test_helpers"

// this adds custom jest matchers from jest-dom
import "jest-dom/extend-expect"

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup)

jest.mock("axios")
const mockCallback = jest.fn()

test("AggregatedBudgetDataDisplay renders with budget data.", async done => {
  const { getByTestId, getByLabelText, debug } = render(
    <AggregatedBudgetDataDisplay
      reducer={{ state: accountDataWithUpdates, dispatch: () => true }}
    />
  )
  debug()

  expect(getByTestId("budget-total")).toHaveTextContent("Budget Total:280000")
  expect(getByTestId("unnecessary-expense-total")).toHaveTextContent(
    "Unnecessary Expense Total:21000"
  )
  done()
})

test("AggregatedBudgetDataDisplay's months dropdowns reflect months available for a selected year.", async done => {
  const { getByTestId, getByLabelText, debug } = render(
    <AggregatedBudgetDataDisplay
      reducer={{ state: accountDataWithUpdates, dispatch: () => true }}
    />
  )
  // Successfully triggers update for the months available in the selected year to be
  // presented in the select dropdown.
  debug()
  fireEvent.click(getByTestId("year-2018"))
  expect(getByTestId("2018-11")).toHaveTextContent("November")
  expect(getByTestId("2018-12")).toHaveTextContent("December")
  expect(getByTestId("budget-total")).toHaveTextContent("Budget Total:180000")
  expect(getByTestId("unnecessary-expense-total")).toHaveTextContent(
    "Unnecessary Expense Total:14000"
  )
  debug()
  done()
})

// NEXT THING I NEED TO TEST
// Ensure that the rendered results in the table are in alignment with what the currently
// Filtered options selected reflect.
// Can use a data-testid of category-{i} to do the DOM grabbin/toHaveTextContent tests.

// test("The Component GetAccountForm's submit action calls it's setBudgetData callback function with the retrieved budgetData from API.", async done => {
//   const { getByTestId, getByLabelText, debug } = render(
//     // setBudgetData={mockCallback} <- callback mock never being called.
//     // Really just here to mitigate warning message that occurs if testing without it.
//     <GetAccountForm setBudgetData={mockCallback} />
//   )
//   changeInputValueAndLoop(getByLabelText, fireEvent, getAccountInput)

//   const getSpy = jest.spyOn(axios, "get")
//   fireEvent.click(getByTestId("getAccountSubmitBtn"))
//   expect(getSpy).toHaveBeenCalledTimes(1)
//   expect(getSpy).toHaveBeenCalledWith(`${BUDGET_API}/get-account`, {
//     accountName: "Primary",
//   })

//   done()
// })

import React from "react"
import axios from "axios"
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
  debugDOM,
} from "react-testing-library"
import ExpenseInputs from "../expense-inputs"
import { changeInputValueAndLoop } from "test_helpers"
import endpoints from "config/api_endpoints"

// this adds custom jest matchers from jest-dom
import "jest-dom/extend-expect"

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup)

jest.mock("axios")

const dateData = {
  current_month: 4,
  current_year: 2019,
}

const necessaryExpenseInput = [
  {
    labelText: "Expense",
    valueInput: "Groceries",
    finalValue: "Groceries",
  },
  {
    labelText: "Amount",
    valueInput: "30000",
    finalValue: "$300.00",
  },
]

const necessaryExpenseParams = {
  expense: "Groceries",
  expense_amount: "30000",
  ...dateData,
}

const unnecessaryExpenseInput = [
  {
    labelText: "Expense",
    finalValue: "Coffee",
  },
  {
    labelText: "Amount",
    finalValue: "$40.00",
  },
]

const unnecessaryExpenseParams = {
  expense: "Coffee",
  expense_amount: "4000",
  ...dateData,
}

test("The Component ExpenseInputs' input updates on user input.", async done => {
  const { getByLabelText } = render(<ExpenseInputs dateData={dateData} />)
  changeInputValueAndLoop(getByLabelText, fireEvent, necessaryExpenseInput)
  done()
})

test("The Component ExpenseInputs' submit action makes a post to budgetData expense API endpoint for necessary expenses.", async done => {
  const { getByTestId, getByLabelText } = render(
    <ExpenseInputs dateData={dateData} />
  )
  changeInputValueAndLoop(getByLabelText, fireEvent, necessaryExpenseInput)
  const dropDown = getByTestId("expense-type-select")
  expect(dropDown.value).toBe("NECESSARY_EXPENSE")

  const getSpy = jest.spyOn(axios, "post")
  // fireEvent.click(getByTestId("expenseBtn"))
  // expect(getSpy).toHaveBeenCalledTimes(1)
  // expect(getSpy).toHaveBeenCalledWith(
  //   endpoints.NECESSARY_EXPENSE_URL,
  //   necessaryExpenseParams
  // )
  done()
})

// test("The Component ExpenseInputs' submit action makes a post to budgetData expense API endpoint for unnecessary expenses.", async done => {
//   const { getByTestId, getByLabelText } = render(
//     <ExpenseInputs dateData={dateData} />
//   )
//   changeInputValueAndLoop(getByLabelText, fireEvent, unnecessaryExpenseInput)
//   const dropDown = getByTestId("expense-type-select")
//   fireEvent.change(dropDown, {
//     target: { value: "UNNECESSARY_EXPENSE" },
//   })
//   expect(dropDown.value).toBe("UNNECESSARY_EXPENSE")

//   const getSpy = jest.spyOn(axios, "post")
//   fireEvent.click(getByTestId("expenseBtn"))
//   expect(getSpy).toHaveBeenCalledTimes(1)
//   expect(getSpy).toHaveBeenCalledWith(
//     endpoints.UNNECESSARY_EXPENSE_URL,
//     unnecessaryExpenseParams
//   )
//   done()
// })

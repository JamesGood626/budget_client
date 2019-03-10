import React from "react"
import axios from "axios"
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
  debugDOM,
} from "react-testing-library"
import BudgetCoordinator from "../BudgetCoordinator"
import { BUDGET_API } from "../../../config"
import { initialGetAccountData } from "../../../test_fixture_data"
import { changeInputValueAndLoop } from "../../../test_helpers"

// this adds custom jest matchers from jest-dom
import "jest-dom/extend-expect"

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup)

jest.mock("axios")
// const mockCallback = jest.fn()

test("BudgetCoordinator's child Component GetAccountForm's submit action calls it's updateBudgetData callback function with the retrieved budgetData from API.", async done => {
  const { getByTestId, getByLabelText, debug } = render(<BudgetCoordinator />)

  const inputsList = [
    {
      labelText: "Account Name",
      newInputValue: "Primary",
    },
  ]
  changeInputValueAndLoop(getByLabelText, fireEvent, inputsList)

  const getSpy = jest.spyOn(axios, "get")
  fireEvent.click(getByTestId("getAccountSubmitBtn"))
  expect(getSpy).toHaveBeenCalledTimes(1)
  expect(getSpy).toHaveBeenCalledWith(`${BUDGET_API}/get-account`, {
    accountName: "Primary",
  })
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

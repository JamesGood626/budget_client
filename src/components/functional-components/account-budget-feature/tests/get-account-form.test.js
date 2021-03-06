import React from "react"
import axios from "axios"
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
  debugDOM,
} from "react-testing-library"
// import GetAccountForm from "../get-account-form"
import endpoints from "config/api_endpoints"
// import { getAccountInput } from "../../../test_fixture_data"
import { changeInputValueAndLoop } from "test_helpers"

// this adds custom jest matchers from jest-dom
import "jest-dom/extend-expect"

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup)

// jest.mock("axios")
// const mockCallback = jest.fn()

test("1+2=3", () => {
  expect(1 + 2).toBe(3)
})
// test("The Component GetAccountForm's input updates on user input.", async done => {
//   const { getByTestId, getByLabelText, debug } = render(<GetAccountForm />)
//   changeInputValueAndLoop(getByLabelText, fireEvent, getAccountInput)
//   done()
// })

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
//   expect(getSpy).toHaveBeenCalledWith(endpoints.GET_ACCOUNT, {
//     accountName: "Primary",
//   })

//   done()
// })

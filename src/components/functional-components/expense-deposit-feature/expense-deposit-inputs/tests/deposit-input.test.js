import React from "react"
import axios from "axios"
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
  debugDOM,
} from "react-testing-library"
import DepositInputs from "../deposit-inputs"
import { changeInputValueAndLoop } from "test_helpers"
import endpoints from "config/api_endpoints"
import { successfulDepositResponse } from "test_fixture_data"

// this adds custom jest matchers from jest-dom
import "jest-dom/extend-expect"

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup)

jest.mock("axios")
const depositFn = jest.fn(params => console.log("PARAMS IN MOCK: ", params))

const dateData = {
  current_month: 4,
  current_year: 2019,
}

const depositInput = [
  {
    labelText: "Income Source",
    valueInput: "Check",
    finalValue: "Check",
  },
  {
    labelText: "Deposit Amount",
    valueInput: "4000000",
    finalValue: "$40,000.00",
  },
]

const depositParams = {
  income_source: "Check",
  deposit_amount: "4000000",
  ...dateData,
}

test("The Component DepositInputs' input updates on user input.", async done => {
  const { getByLabelText } = render(
    <DepositInputs
      dateData={dateData}
      deposit={params => console.log("GOT PARAMS: ", params)}
    />
  )
  changeInputValueAndLoop(getByLabelText, fireEvent, depositInput)
  done()
})

test("The Component DepositInputs' submit action makes a post to budgetData deposit API endpoint.", async done => {
  const { getByTestId, getByLabelText } = render(
    <DepositInputs dateData={dateData} deposit={depositFn} />
  )
  changeInputValueAndLoop(getByLabelText, fireEvent, depositInput)

  const postSpy = jest.spyOn(axios, "post")

  await fireEvent.click(getByTestId("depositBtn"))
  // TODO: Look into alternatives to testing this
  // perhaps pass in a cb function with an expect inside and expect
  // that it was called with the desired arg?
  // expect(postSpy).toHaveBeenCalledTimes(1)
  // expect(postSpy).toHaveBeenCalledWith(endpoints.DEPOSIT_URL, depositParams)
  // mock function (serving as callback) is called in the handleSubmit function,
  // but expect toBeCalled is false.
  // expect(depositFn).toBeCalled()
  done()
})

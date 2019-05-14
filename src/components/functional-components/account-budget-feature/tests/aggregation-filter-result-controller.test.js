import React from "react"
// import axios from "axios"
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
  debugDOM,
} from "react-testing-library"
import AggregationFilterResultController from "../aggregation-filter-result-controller"
import { accountDataWithUpdates } from "test_fixture_data"

// this adds custom jest matchers from jest-dom
import "jest-dom/extend-expect"

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup)

// [
//     "All Activity",
//     "All Unnecessary Expenses",
//     "All Necessary Expenses",
//     "All Deposits",
//   ]

// TODO:
// Move these into test-helpers
// also set up proper dates, and ensure that the dates are rendered in appropriate order.
const depositActivityTestArr = [
  { testId: "DEPOSIT-0", content: "Check$4,000.00TBD" },
  { testId: "DEPOSIT-1", content: "Check$100.00TBD" },
  { testId: "DEPOSIT-2", content: "Check$4,000.00TBD" },
  { testId: "DEPOSIT-3", content: "Check$100.00TBD" },
]

const necessaryExpenseActivityTestArr = [
  { testId: "NECESSARY_EXPENSE-0", content: "Rent$3,600.00TBD" },
  { testId: "NECESSARY_EXPENSE-1", content: "Groceries$70.00TBD" },
  { testId: "NECESSARY_EXPENSE-2", content: "Rent$3,600.00TBD" },
  { testId: "NECESSARY_EXPENSE-3", content: "Groceries$70.00TBD" },
]

const unnecessaryExpenseActivityTestArr = [
  { testId: "UNNECESSARY_EXPENSE-0", content: "Coffee$50.00TBD" },
  { testId: "UNNECESSARY_EXPENSE-1", content: "Eat out$20.00TBD" },
  { testId: "UNNECESSARY_EXPENSE-2", content: "Coffee$50.00TBD" },
  { testId: "UNNECESSARY_EXPENSE-3", content: "Eat out$20.00TBD" },
]

const expectTableContentsToBe = (activityTestArr, getByTestId) => {
  activityTestArr.forEach(({ testId, content }) => {
    expect(getByTestId(testId)).toHaveTextContent(content)
  })
}

test("AggregationFilterResultController renders all account activity deposits.", async done => {
  // TODO: determine how I structured showMonthData for all possible cases within
  // aggregated-budget-data-display.js
  const { getByTestId, getByLabelText, debug } = render(
    <AggregationFilterResultController
      years={"SINGLE"}
      yearData={accountDataWithUpdates.years_tracked[2018]}
      showMonthData={[11, 12]}
      accountActivityFilter={"All Deposits"}
    />
  )

  expectTableContentsToBe(depositActivityTestArr, getByTestId)
  done()
})

test("AggregationFilterResultController renders all account activity necessary expenses.", async done => {
  // TODO: determine how I structured showMonthData for all possible cases within
  // aggregated-budget-data-display.js
  const { getByTestId, getByLabelText, debug } = render(
    <AggregationFilterResultController
      years={"SINGLE"}
      yearData={accountDataWithUpdates.years_tracked[2018]}
      showMonthData={[11, 12]}
      accountActivityFilter={"All Necessary Expenses"}
    />
  )

  expectTableContentsToBe(necessaryExpenseActivityTestArr, getByTestId)
  done()
})

test("AggregationFilterResultController renders all account activity unnecessary expenses.", async done => {
  // TODO: determine how I structured showMonthData for all possible cases within
  // aggregated-budget-data-display.js
  const { getByTestId, getByLabelText, debug } = render(
    <AggregationFilterResultController
      years={"SINGLE"}
      yearData={accountDataWithUpdates.years_tracked[2018]}
      showMonthData={[11, 12]}
      accountActivityFilter={"All Unnecessary Expenses"}
    />
  )

  expectTableContentsToBe(unnecessaryExpenseActivityTestArr, getByTestId)
  done()
})

test("AggregationFilterResultController renders all account activity.", async done => {
  // TODO: determine how I structured showMonthData for all possible cases within
  // aggregated-budget-data-display.js
  const { getByTestId, getByLabelText, debug } = render(
    <AggregationFilterResultController
      years={"SINGLE"}
      yearData={accountDataWithUpdates.years_tracked[2018]}
      showMonthData={[11, 12]}
      accountActivityFilter={"All Activity"}
    />
  )

  debug()

  // expectTableContentsToBe(unnecessaryExpenseActivityTestArr, getByTestId)
  done()
})

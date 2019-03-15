import React from "react"
import AggregatedBudgetExpenseTotal from "./aggregated-budget-expense-total"
import AccountActivityTable from "./account-activity-table"

// FUTURE REFACTOR:
// Would be much cleaner if I moved this logic up into
// AggregatedBudgetDataDisplay and only pass down the totals to this component
// YES -> This is the way to go for sure.
// New plan:
//  - Create a controller component which will be passed
//    everything that this component (AggregatedBudgetExpenseTotal)
//  - The controller component will be a child of AggregatedBudgetDataDisplay
//    and will be a functional component which utilizes react hooks to
//    transform the data received as props, and create internal state that will
//    be used to pass down the final output that this component (AggregatedBudgetEx)
//    and the Table component will require -> so that they may remain stricly presontational
//    components.

const aggregateBudgetData = (
  years,
  yearData,
  showMonthData,
  accountActivityFilter
) => {
  if (years !== "SINGLE") {
    return multipleYearAggregation(
      years,
      yearData,
      showMonthData,
      accountActivityFilter
    )
  }
  return singleYearAggregation(yearData, showMonthData, accountActivityFilter)
}

// years shape:
// ['2018', '2019']
// yearData shape:
// See test fixture data, it's years_tracked off of that.
// showMonthData shape:
// {
//   '2018': ['11', '12'],
//   '2019': ['1']
// } <- in the event of selectedYear being "All Years"
// otherwise it'll be an array of months for a single year
// i.e. ['11', '12']
const multipleYearAggregation = (
  years,
  yearData,
  showMonthData,
  accountActivityFilter
) => {
  return years.reduce(
    (acc, year) => {
      const monthKeys = showMonthData[year]
      const allBudgetAndUnnecessaryExpenses = monthKeys.map(monthKey => {
        const monthData = yearData[year].months_tracked[monthKey]
        const budget = monthData.budget
        const unnecessaryExpenses = monthData.total_unnecessary_expenses
        const accountActivityData = filterAccountActivityData(
          monthData,
          accountActivityFilter
        )
        return [budget, unnecessaryExpenses, accountActivityData]
      })
      allBudgetAndUnnecessaryExpenses.forEach(
        ([budget, unnecessaryExpenses, accountActivityData]) => {
          console.log("FILTERED DATA: ", accountActivityData)
          acc.totals.budgetTotal += budget
          acc.totals.unnecessaryExpensesTotal += unnecessaryExpenses
          acc.accountActivityData = [
            ...acc.accountActivityData,
            ...accountActivityData,
          ]
        }
      )
      return acc
    },
    {
      totals: { budgetTotal: 0, unnecessaryExpensesTotal: 0 },
      accountActivityData: [],
    }
  )
}

const singleYearAggregation = (
  yearData,
  showMonthData,
  accountActivityFilter
) => {
  let responseObj = {
    totals: {
      budgetTotal: 0,
      unnecessaryExpensesTotal: 0,
    },
    accountActivityData: [],
  }

  let monthKeys = Object.getOwnPropertyNames(yearData.months_tracked)
  monthKeys =
    showMonthData === "All Months"
      ? monthKeys
      : monthKeys.filter(month => showMonthData.includes(month))

  const allBudgetAndUnnecessaryExpenses = monthKeys.map(monthKey => {
    const monthData = yearData.months_tracked[monthKey]
    const budget = monthData.budget
    const unnecessaryExpenses = monthData.total_unnecessary_expenses
    const accountActivityData = filterAccountActivityData(
      monthData,
      accountActivityFilter
    )
    return [budget, unnecessaryExpenses, accountActivityData]
  })

  allBudgetAndUnnecessaryExpenses.forEach(
    ([budget, unnecessaryExpenses, accountActivityData]) => {
      console.log("FILTERED DATA: ", accountActivityData)
      responseObj.totals.budgetTotal += budget
      responseObj.totals.unnecessaryExpensesTotal += unnecessaryExpenses
      responseObj.accountActivityData = [
        ...responseObj.accountActivityData,
        ...accountActivityData,
      ]
    }
  )
  return responseObj
}

const filterAccountActivityData = (monthData, accountActivityFilter) => {
  switch (accountActivityFilter) {
    case "All Activity":
      return concatenateDataArrays(monthData)
    case "All Unnecessary Expenses":
      return monthData.unnecessary_expenses
    case "All Necessary Expenses":
      return monthData.necessary_expenses
    case "All Deposits":
      return monthData.deposits
  }
}

const concatenateDataArrays = monthData => {
  const { deposits, necessary_expenses, unnecessary_expenses } = monthData
  const firstConcat = deposits.concat(necessary_expenses)
  return firstConcat.concat(unnecessary_expenses)
}

// Props:
// 1. (years) is either an array of all the available years
// or a constant "SINGLE" which determines which logic we'll
// use to parse the data structure to determine total.
// 2. (yearData) will always be an object
// 3. (showMonthData) is either a an object of shape:
// {
//   '2018': ['11', '12'],
//   '2019': ['1']
// }
// in the case of All Years and All Months selected.
// OR a constant "ALL MONTHS" or an array of selected months -> [11, 12]
const aggregationFilterResultController = ({
  years,
  yearData,
  showMonthData,
  accountActivityFilter,
}) => {
  // TODO:
  // Filter data off based on accountActivityFilter
  const { totals, accountActivityData } = aggregateBudgetData(
    years,
    yearData,
    showMonthData,
    accountActivityFilter
  )
  // console.log("THE ACCOUNT ACTIVITY FILTER: ", accountActivityFilter)
  console.log("SHOW ME THE DATA: ", accountActivityData)
  return (
    <div>
      <AggregatedBudgetExpenseTotal totals={totals} />
      <AccountActivityTable accountActivityData={accountActivityData} />
    </div>
  )
}

export default aggregationFilterResultController

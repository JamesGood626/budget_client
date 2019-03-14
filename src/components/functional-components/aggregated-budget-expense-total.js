import React from "react"

// Starting with displaying
const calculateTotals = (years, yearData, showMonthData) => {
  if (years !== "SINGLE") {
    // Map over the years
    return calculateMultipleYears(years, yearData, showMonthData)
  }
  // Only a single year
  return calculateSingleYear(yearData, showMonthData)
}

// years shape:
// ['11', '12']
// yearData shape:
// See test fixture data, it's years_tracked off of that.
// showMonthData shape:
// {
//   '2018': ['11', '12'],
//   '2019': ['1']
// }
const calculateMultipleYears = (years, yearData, showMonthData) => {
  return years.reduce(
    (acc, year) => {
      const monthKeys = showMonthData[year]
      const allBudgetAndUnnecessaryExpenses = monthKeys.map(monthKey => {
        const budget = yearData[year].months_tracked[monthKey].budget
        const unnecessaryExpenses =
          yearData[year].months_tracked[monthKey].total_unnecessary_expenses
        return [budget, unnecessaryExpenses]
      })
      allBudgetAndUnnecessaryExpenses.forEach(
        ([budget, unnecessaryExpenses]) => {
          acc.budgetTotal += budget
          acc.unnecessaryExpensesTotal += unnecessaryExpenses
        }
      )
      return acc
    },
    { budgetTotal: 0, unnecessaryExpensesTotal: 0 }
  )
}

const calculateSingleYear = (yearData, showMonthData) => {
  let totals = {
    budgetTotal: 0,
    unnecessaryExpensesTotal: 0,
  }

  let monthKeys = Object.getOwnPropertyNames(yearData.months_tracked)
  monthKeys =
    showMonthData === "All Months"
      ? monthKeys
      : monthKeys.filter(month => showMonthData.includes(month))

  const allBudgetAndUnnecessaryExpenses = monthKeys.map(monthKey => {
    const budget = yearData.months_tracked[monthKey].budget
    const unnecessaryExpenses =
      yearData.months_tracked[monthKey].total_unnecessary_expenses
    return [budget, unnecessaryExpenses]
  })

  allBudgetAndUnnecessaryExpenses.forEach(([budget, unnecessaryExpenses]) => {
    totals.budgetTotal += budget
    totals.unnecessaryExpensesTotal += unnecessaryExpenses
  })
  return totals
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
const aggregatedBudgetExpenseTotal = ({ years, yearData, showMonthData }) => {
  const { budgetTotal, unnecessaryExpensesTotal } = calculateTotals(
    years,
    yearData,
    showMonthData
  )
  return (
    <div>
      <h1>No Options</h1>
      <div>
        <div data-testid="budget-total">
          <h4>Budget Total:</h4>
          <p>{budgetTotal}</p>
        </div>
        <div data-testid="unnecessary-expense-total">
          <h4>Unnecessary Expense Total:</h4>
          <p>{unnecessaryExpensesTotal}</p>
        </div>
      </div>
    </div>
  )
}

export default aggregatedBudgetExpenseTotal

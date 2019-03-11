import React, { useState, useEffect } from "react"

// Does successfully render the data structures available in
// yearsAvailable and monthsAvailable
// These will be used for the yearsFilter and monthsFilter
// Dependending upon which year is selected in the dropdown
// Will determine which months are display in the months dropdown.
function renderYears(years, months) {
  return years.map(year => (
    <div>
      <h1 key={year}>{year}</h1>
      <ul>
        {months[year].map(month => (
          <li>{month}</li>
        ))}
      </ul>
    </div>
  ))
}

const aggregatedBudgetDataDisplay = ({ reducer: { state } }) => {
  const expenseDepositFilter = useExpenseDepositFilter()
  const [yearsAvailable, setYearsAvailable] = useState([])
  const [monthsAvailable, setMonthsAvailable] = useState([])
  console.log("GOT STATE IN AGGREGATED BDD: ", state)
  useEffect(() => {
    console.log("AGGREGATE MOUNTING")
    const { years_tracked } = state.budget_tracker
    const yearKeys = Object.getOwnPropertyNames(years_tracked)
    const monthKeys = yearKeys.reduce((acc, year) => {
      const months = Object.getOwnPropertyNames(
        years_tracked[year].months_tracked
      )
      acc[year] = months
      return acc
    }, {})
    setYearsAvailable(yearKeys)
    setMonthsAvailable(monthKeys)
    // setYearsAvailable(yearKeys)
    // empty array for right now to prevent re-render after setYearsAvailable is called,
    // but will need to listen for expenseDepositFilter change once I get to that point.
  }, [])

  return (
    <div>
      <h1>Display</h1>
      {renderYears(yearsAvailable, monthsAvailable)}
    </div>
  )
}

const useExpenseDepositFilter = () => {
  const [expenseDepositFilter, setExpenseDepositFilter] = useState(
    "ALL_EXPENSES"
  )

  const changeExpenseDepositFilter = e => {
    setExpenseDepositFilter(e.target.value)
  }

  return {
    value: expenseDepositFilter,
    onChange: changeExpenseDepositFilter,
  }
}

// selectedYears?
// const useYearsAvailable = () => {
//   const [yearsAvailable, setYearsAvailable] = useState()

//   const changeYearsAvailable = () => {
//     setYearsAvailable(e.target.value)
//   }

//   return {
//     value: yearsAvailable,
//     onChange: changeYearsAvailable,
//   }
// }

// To display an aggregated budget & the Unnecessary Expense Total
// 1. get the keys for all years_tracked (Will return array of keys)
//    Object.getOwnPropertyNames(state.budget_tracker.years_tracked)
// 2. Subsequently, access the object of each year,
//    and then get the keys for all months_tracked.
//    Object.getOwnPropertyNames(curr_year.months_tracked)
//    As you iterate through each year's months...
//    Access budget & total_unnecessary_expenses on each month_tracked
//    (This will most likely utilize reduce to obtain the required totals)
// 4. And then based on whether all expenses/all deposits are selected.
//    return an array of jsx elements as well when iterating through the months_tracked.
export default aggregatedBudgetDataDisplay

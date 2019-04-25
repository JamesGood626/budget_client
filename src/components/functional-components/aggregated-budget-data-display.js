import React, { useState, useEffect } from "react"
import styled from "styled-components"
import AggregationFilterResultController from "./aggregation-filter-result-controller"
import AccountActivityDropDown from "./filter-dropdowns/account-activity-dropdown"
import YearsAndMonthDropdowns from "./filter-dropdowns/years-and-month-dropdowns"

// up arrow code just incase -> &#9650;

// LATEST TODO: Mar 14th
//  See top comment in aggregated-budget-expense-total.js
// year/month selection invariants
// If more than one year is selected,
// then by default, all months in those years will be selected.
// If only one month is selected, then only subsequent months
// may be selected after one is chosen. i.e. the user can't choose
// June and August, but may choose June, July, August.

const Container = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 600px) {
    align-items: center;
  }

  #dropdowns {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1.6rem;

    @media screen and (max-width: 500px) {
      width: ${props => props.theme.smallWidth};
    }

    @media screen and (min-width: 500px) and (max-width: 780px) {
      width: ${props => props.theme.mediumWidth};
    }
  }
`

const accountActivityOptions = [
  "All Activity",
  "All Unnecessary Expenses",
  "All Necessary Expenses",
  "All Deposits",
]

// Does successfully render the data structures available in
// yearsAvailable and monthsAvailable
// These will be used for the yearsFilter and monthsFilter
// Dependending upon which year is selected in the dropdown
// Will determine which months are display in the months dropdown.

const setYearsAndMonthsAvailableKeys = (
  data,
  setYearsAvailable,
  setMonthsAvailable
) => {
  console.log("data before err: ", data)
  const { years_tracked } = data
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
}

const aggregatedBudgetDataDisplay = ({
  reducer: {
    state: { data },
  },
}) => {
  const [yearsAvailable, setYearsAvailable] = useState([])
  const [monthsAvailable, setMonthsAvailable] = useState([])
  const [expenseDepositFilter, setExpenseDepositFilter] = useState(
    "All Activity"
  )
  const [selectedYear, setSelectedYear] = useState("ALL_YEARS")
  const { selectedMonths, changeSelectedMonths } = useSelectMonths("ALL_MONTHS")
  useEffect(() => {
    if (yearsAvailable.length === 0) {
      console.log("THE DATA: ", data)
      setYearsAndMonthsAvailableKeys(
        data,
        setYearsAvailable,
        setMonthsAvailable
      )
    }

    // empty array for right now to prevent re-render after setYearsAvailable is called,
    // but will need to listen for expenseDepositFilter change once I get to that point.
    // Or perhaps I won't... because as of right now, when selecting a year to set as selectedYear,
    // the UI re-renders.
  }, [])

  return (
    <Container>
      <div id="dropdowns">
        <AccountActivityDropDown
          accountActivityOptions={accountActivityOptions}
          setExpenseDepositFilter={setExpenseDepositFilter}
        />
        <YearsAndMonthDropdowns
          yearsAvailable={yearsAvailable}
          setSelectedYear={setSelectedYear}
          selectedYear={selectedYear}
          monthsAvailable={monthsAvailable}
          changeSelectedMonths={changeSelectedMonths}
        />
      </div>
      {/* The div with two inner divs */}
      {/* This component needs data:
      1. years_tracked if All Years selected. Otherwise, the selected year.
      2. For months -> if All Years selected, by default all months data will
         be aggregated. Otherwise, only aggregate the data for the
         months that are provided as props via selectedMonths.
      3. Last thing... All Expenses/All Deposits to determine which data will
         be displayed in the table from each month. */}
      {yearsAvailable.length > 0 && (
        <AggregationFilterResultController
          years={selectedYear === "ALL_YEARS" ? yearsAvailable : "SINGLE"}
          yearData={
            selectedYear === "ALL_YEARS"
              ? data.years_tracked
              : data.years_tracked[selectedYear]
          }
          showMonthData={
            selectedYear === "ALL_YEARS" ? monthsAvailable : selectedMonths
          }
          accountActivityFilter={expenseDepositFilter}
        />
      )}
      {/* The component that will display filtered data based on selected year/months from dropdown */}
      {/* expensesOrDeposits -> "All Unnecessary Expenses" or "All Necessary Expenses" or "All Deposits" */}
      {/* Will also need to pass down the selected year's months_tracked or in the
          case of All Years just pass down years_tracked */}
      {/* <BudgetHistoryTable expensesOrDeposits={expenseDepositFilter} /> */}
    </Container>
  )
}

const useSelectMonths = initialState => {
  const [selectedMonths, setSelectedMonths] = useState(initialState)

  // TODO:
  // Need to handle preventing UI from reflecting a successful selection if
  // this invariant doesn't hold true.
  const changeSelectedMonths = month => {
    if (typeof selectedMonths === "Array") {
      const lastElementPosition = selectedMonths.length - 1
      // This is to ensure that August can't be added to the selectedMonths array if
      // July doesn't precede it.
      if (selectedMonths[lastElementPosition] + 1 === month) {
        let newSelectedMonths = [...selectedMonths, month]
        setSelectedMonths(newSelectedMonths)
      }
    } else {
      setSelectedMonths([month])
    }
  }

  return {
    selectedMonths,
    changeSelectedMonths,
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
// export default withStateMachine(statechart)(aggregatedBudgetDataDisplay)

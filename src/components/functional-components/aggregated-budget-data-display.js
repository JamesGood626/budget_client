import React, { useState, useEffect } from "react"
import styled from "styled-components"
import AggregationFilterResultController from "./aggregation-filter-result-controller"

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
  justify-content: space-between;
  margin-bottom: 1.6rem;
`

const Label = styled.label`
  display: block;
  position: relative;
  width: 8.4rem;
  height: 1.8rem;
  border-radius: 8px;
`

const Select = styled.select`
  position: relative;
  width: 8.4rem;
  height: 1.8rem;
  font-size: 0.8rem;
  font-weight: bold;
  // Gets rid of the arrows
  -webkit-appearance: none;
  border: 0;
  border-radius: 0;
  &:hover {
    cursor: pointer;
  }
  &:focus {
    outline: none;
  }
  border-radius: 8px;
  background: #fff;
  background: lime;
  box-shadow: 2px 2px 8px 0 rgba(0, 0, 0, 25%);
`

const LabelTextSpan = styled.span`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 30px;
  font-size: 1rem;
  font-weight: bold;
  color: #1d470c;
  pointer-events: none;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  border-radius: 8px;
  background: #fff;

  span {
    position: absolute;
    z-index: 30;
    left: 0.6rem;
    font-size: 0.9rem;
    width: 1rem;
    height: 1.7rem;
  }
`

const monthObj = {
  1: "January",
  2: "February",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December",
}

const accountActivityOptions = [
  "All Activity",
  "All Unnecessary Expenses",
  "All Necessary Expenses",
  "All Deposits",
]

const renderAccountActivityOptions = (options, callback) => {
  return (
    <Label htmlFor="account-activity-select">
      <Select id="account-activity-select" defaultValue="All Activity">
        {options.map(option => (
          <option value={option} key={option} onClick={() => callback(option)}>
            {option}
          </option>
        ))}
      </Select>
      <LabelTextSpan>
        {/* TODO: Text needs to be the option selected from the dropdown */}
        <span>&#9660;</span>Text
      </LabelTextSpan>
    </Label>
  )
}

const renderYearsDropDown = (years, setSelectedYear) => {
  return (
    <Label htmlFor="years-select">
      <Select id="years-select" defaultValue="All Years">
        {years.map(year => (
          <option
            value={year}
            key={year}
            onClick={() => setSelectedYear(year)}
            data-testid={`year-${year}`}
          >
            {year}
          </option>
        ))}
      </Select>
      <LabelTextSpan>
        {/* TODO: Text needs to be the option selected from the dropdown */}
        <span>&#9660;</span>Text
      </LabelTextSpan>
    </Label>
  )
}

// Does successfully render the data structures available in
// yearsAvailable and monthsAvailable
// These will be used for the yearsFilter and monthsFilter
// Dependending upon which year is selected in the dropdown
// Will determine which months are display in the months dropdown.
const renderMonthsDropDown = (year, months, changeSelectedMonths) => {
  // Convert this function to just take in a single selected year.
  return (
    <Label htmlFor="months-select">
      <Select id="months-select" defaultValue="All Months">
        <option value="All Months">All Months</option>
        {year !== "All Years" &&
          months[year].map(month => (
            <option
              value={month}
              key={`${year}-${month}`}
              onClick={() => changeSelectedMonths(month)}
              data-testid={`${year}-${month}`}
            >
              {monthObj[month]}
            </option>
          ))}
      </Select>
      <LabelTextSpan>
        {/* TODO: Text needs to be the option selected from the dropdown */}
        <span>&#9660;</span>Text
      </LabelTextSpan>
    </Label>
  )
}

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
  const [selectedYear, setSelectedYear] = useState("All Years")
  const { selectedMonths, changeSelectedMonths } = useSelectMonths("All Months")
  // console.log("GOT STATE IN AGGREGATED BDD: ", state)
  // console.log("THE MONTHS AVAILABLE: ", monthsAvailable)
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
    <div>
      <Container>
        {renderAccountActivityOptions(
          accountActivityOptions,
          setExpenseDepositFilter
        )}
        {yearsAvailable.length > 0 &&
          renderYearsDropDown(yearsAvailable, setSelectedYear)}
        {yearsAvailable.length > 0 && selectedYear
          ? renderMonthsDropDown(
              selectedYear,
              monthsAvailable,
              changeSelectedMonths
            )
          : null}
      </Container>
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
          years={selectedYear === "All Years" ? yearsAvailable : "SINGLE"}
          yearData={
            selectedYear === "All Years"
              ? data.years_tracked
              : data.years_tracked[selectedYear]
          }
          showMonthData={
            selectedYear === "All Years" ? monthsAvailable : selectedMonths
          }
          accountActivityFilter={expenseDepositFilter}
        />
      )}
      {/* The component that will display filtered data based on selected year/months from dropdown */}
      {/* expensesOrDeposits -> "All Unnecessary Expenses" or "All Necessary Expenses" or "All Deposits" */}
      {/* Will also need to pass down the selected year's months_tracked or in the
          case of All Years just pass down years_tracked */}
      {/* <BudgetHistoryTable expensesOrDeposits={expenseDepositFilter} /> */}
    </div>
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

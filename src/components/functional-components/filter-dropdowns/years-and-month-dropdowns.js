import React from "react"
// import { Action, withStateMachine } from "react-automata"
import YearsDropdown from "components/functional-components/filter-dropdowns/years-dropdown"
import MonthsDropdown from "components/functional-components/filter-dropdowns/months-dropdown"
// import statechart from "./year-and-month-statechart"

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

const selectYearOption = (year, setSelectedYear, changeSelectedMonths) => {
  setSelectedYear(year)
  changeSelectedMonths("ALL_MONTHS")
}

const yearsAndMonthDropdowns = ({
  yearsAvailable,
  setSelectedYear,
  selectedYear,
  monthsAvailable,
  changeSelectedMonths,
}) => {
  if (yearsAvailable.length === 0 && !selectedYear) {
    return
  }
  return (
    <>
      <YearsDropdown
        yearsAvailable={yearsAvailable}
        selectYearOption={year =>
          selectYearOption(year, setSelectedYear, changeSelectedMonths)
        }
      />
      <MonthsDropdown
        selectedYear={selectedYear}
        monthsAvailable={monthsAvailable}
        changeSelectedMonths={changeSelectedMonths}
        monthObj={monthObj}
      />
    </>
  )
}

export default yearsAndMonthDropdowns

import React from "react"
import { Select, Label, LabelTextSpan } from "./dropdown-styles"

export default function monthsDropdown({
  selectedYear,
  monthsAvailable,
  changeSelectedMonths,
  monthObj,
}) {
  return (
    <Label htmlFor="months-select">
      <Select
        id="months-select"
        defaultValue="ALL_MONTHS"
        onChange={e => {
          const month = e.target.value
          console.log("SELECTED month: ", month)
          changeSelectedMonths(month)
        }}
      >
        <option value="ALL_MONTHS">All Months</option>
        {selectedYear !== "ALL_YEARS" &&
          monthsAvailable[selectedYear].map(month => {
            console.log("MAPPING MONTHS: ", month)
            return (
              <option
                value={month}
                key={`${selectedYear}-${month}`}
                data-testid={`${selectedYear}-${month}`}
              >
                {monthObj[month]}
              </option>
            )
          })}
      </Select>
      <LabelTextSpan>
        <span>&#9660;</span>Months
      </LabelTextSpan>
    </Label>
  )
}

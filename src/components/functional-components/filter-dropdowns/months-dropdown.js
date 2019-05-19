import React from "react"
import {
  Select,
  Label,
  LabelTextSpan,
} from "components/functional-components/filter-dropdowns/dropdown-styles"

export default function monthsDropdown({
  selectedYear,
  monthsAvailable,
  setSelectedMonths,
  monthObj,
}) {
  return (
    <Label htmlFor="months-select">
      <Select
        id="months-select"
        defaultValue="ALL_MONTHS"
        onChange={e => {
          const month = e.target.value
          setSelectedMonths(month)
        }}
      >
        <option value="ALL_MONTHS">All Months</option>
        {selectedYear !== "ALL_YEARS" &&
          monthsAvailable[selectedYear].map(month => {
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

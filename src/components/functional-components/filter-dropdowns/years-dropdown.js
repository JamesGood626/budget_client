import React from "react"
import { Select, Label, LabelTextSpan } from "./dropdown-styles"

export default function yearsDropdown({ yearsAvailable, selectYearOption }) {
  return (
    <Label htmlFor="years-select">
      <Select
        id="years-select"
        defaultValue="ALL_YEARS"
        onChange={e => {
          const year = e.target.value
          selectYearOption(year)
        }}
      >
        <option value="ALL_YEARS" key="all-years" data-testid={`all-years`}>
          All Years
        </option>
        {yearsAvailable.map(year => (
          <option value={year} key={year} data-testid={`year-${year}`}>
            {year}
          </option>
        ))}
      </Select>
      <LabelTextSpan>
        <span>&#9660;</span>Years
      </LabelTextSpan>
    </Label>
  )
}

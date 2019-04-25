import React from "react"
import { Select, Label, LabelTextSpan } from "./dropdown-styles"

export default function accountActivityDropdown({
  accountActivityOptions,
  setExpenseDepositFilter,
}) {
  return (
    <Label htmlFor="account-activity-select">
      <Select id="account-activity-select" defaultValue="All Activity">
        {accountActivityOptions.map(option => (
          <option
            value={option}
            key={option}
            onClick={() => setExpenseDepositFilter(option)}
          >
            {option}
          </option>
        ))}
      </Select>
      <LabelTextSpan>
        {/* TODO: Text needs to be the option selected from the dropdown */}
        <span>&#9660;</span>Activity
      </LabelTextSpan>
    </Label>
  )
}

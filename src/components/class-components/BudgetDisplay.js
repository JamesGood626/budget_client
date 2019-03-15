import React, { useReducer } from "react"
import BudgetContext from "../BudgetContext"
import PrimaryAccountDetails from "../functional-components/primary-account-details"
import TransactButtons from "../functional-components/transact-buttons"
import AggregatedBudgetDataDisplay from "../functional-components/aggregated-budget-data-display"
// import axios from "axios"
// import { BUDGET_API } from "../../config"

// TODO:
// figure out a different way to handle the axios mocks. Unless that console
// error has no teeth, then leave it be.

// Can create a context, wrap the children in said context, and then use a reducer
// to carry out actions which will interact with the API.

const budgetDisplay = ({ budgetData }) => {
  return (
    <div>
      {console.log("THE BUDGET DATA FOR PRIMARY ACC DETAILS: ", budgetData)}
      <PrimaryAccountDetails
        budget={
          budgetData !== null && budgetData.budget_tracker.budget
            ? budgetData.budget_tracker.budget
            : null
        }
      />
      <BudgetContext.Consumer>
        {value => (
          <>
            <TransactButtons reducer={value} />
            {/*
                AggregatedBudgetDataDisplay contains the dropdowns for filtering
                expense_types, years, and months.
                And the resulting display/table to present the data
            */}
            <AggregatedBudgetDataDisplay reducer={value} />
          </>
        )}
      </BudgetContext.Consumer>
    </div>
  )
}

export default budgetDisplay

// {
//   budget_tracker: {
//     budget: {
//       account_balance: 0,
//       budget_exceeded: false,
//       budget_set: false,
//       current_budget: null,
//     },
//     limit_requests: false,
//     request_limit: 0,
//     serviced_requests: 0,
//     years_tracked: {
//       2019: {
//         months_tracked: {
//           3: {
//             budget: 0,
//             budget_exceeded: false,
//             deposits: [],
//             necessary_expenses: [],
//             total_deposited: 0,
//             total_necessary_expenses: 0,
//             total_unnecessary_expenses: 0,
//             unnecessary_expenses: [],
//           },
//         },
//       },
//     },
//   },
// },

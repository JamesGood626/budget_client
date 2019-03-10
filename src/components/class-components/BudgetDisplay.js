import React, { Component } from "react"
import PrimaryAccountDetails from "../functional-components/primary-account-details"
import axios from "axios"
import { BUDGET_API } from "../../config"

// TODO:
// This could perhaps just be made to be a functional component ->
// as it's only purpose will be to receive the budgetData and pass it down
// to child components.
// Also todo -> figure out a different way to handle the axios mocks. Unless that console
// error has no teeth, then leave it be.
export default class BudgetDisplay extends Component {
  render() {
    const { budgetData } = this.props
    return (
      <div>
        <PrimaryAccountDetails
          budget={
            budgetData !== null && budgetData.budget_tracker.budget
              ? budgetData.budget_tracker.budget
              : null
          }
        />
        <h1>Hello</h1>
      </div>
    )
  }
}

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

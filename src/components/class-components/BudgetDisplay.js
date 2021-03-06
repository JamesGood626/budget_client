import React from "react"
import styled from "styled-components"
import BudgetContext from "components/reducers/budget/BudgetContext"
import PrimaryAccountDetails from "components/functional-components/account-budget-feature/primary-account-details"
import TransactButtons from "components/functional-components/expense-deposit-feature/transact-buttons"
import AggregatedBudgetDataDisplay from "components/functional-components/account-budget-feature/aggregated-budget-data-display"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 44rem;
  margin-top: 4rem;
  margin-bottom: 4rem;

  #buttons-and-table-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 1rem;
  }
`

// TODO:
// figure out a different way to handle the axios mocks. Unless that console
// warning has no teeth, then leave it be.

// Can create a context, wrap the children in said context, and then use a reducer
// to carry out actions which will interact with the API.

const budgetDisplay = ({ budgetData }) => {
  return (
    <Container>
      <BudgetContext.Consumer>
        {value => {
          return (
            <>
              <PrimaryAccountDetails
                reducer={value}
                budget={budgetData.budget}
              />
              <div id="buttons-and-table-container">
                <TransactButtons reducer={value} />
                {/*
                  AggregatedBudgetDataDisplay contains the dropdowns for filtering
                  expense_types, years, and months.
                  And the resulting display/table to present the data
                */}
                <AggregatedBudgetDataDisplay reducer={value} />
              </div>
            </>
          )
        }}
      </BudgetContext.Consumer>
    </Container>
  )
}

export default budgetDisplay

// What the API is actually returning as data as of 4/20/2019
// {
//   "years_tracked": {
//     "2019": {
//       "months_tracked": {
//         "4": {
//           "unnecessary_expenses": [],
//           "total_unnecessary_expenses": 0,
//           "total_necessary_expenses": 0,
//           "total_deposited": 0,
//           "necessary_expenses": [],
//           "deposits": [],
//           "budget_exceeded": false,
//           "budget": 0
//         }
//       }
//     }
//   },
//   "current_year": 2019,
//   "current_month": 4,
//   "budget": {
//     "current_budget": null,
//     "budget_set": false,
//     "budget_exceeded": false,
//     "account_balance": 0
//   }
// }

// Old way I had modeled data for the initial testing... This change will require a refactor.
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

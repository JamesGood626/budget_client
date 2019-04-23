import React from "react"
import axios from "axios"
import styled from "styled-components"
import BudgetContext from "../BudgetContext"
import PrimaryAccountDetails from "../functional-components/primary-account-details"
import TransactButtons from "../functional-components/transact-buttons"
import AggregatedBudgetDataDisplay from "../functional-components/aggregated-budget-data-display"
import endpoints from "../../config/api_endpoints"
// import axios from "axios"

// only required while styling the application
import { accountDataWithUpdates } from "../../test_fixture_data/index"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: auto;
  height: 44rem;
  margin-top: 4rem;
  margin-bottom: 4rem;
  /* background: #fff; */

  #buttons-and-table-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 1rem;
  }
`

// TODO:
// figure out a different way to handle the axios mocks. Unless that console
// error has no teeth, then leave it be.

// Can create a context, wrap the children in said context, and then use a reducer
// to carry out actions which will interact with the API.

const budgetDisplay = ({ budgetData, setBudgetData }) => {
  console.log("budget display attempting to render: ", budgetData)
  if (budgetData === null) {
    setBudgetData(accountDataWithUpdates)
    // console.log("fetching budget data")
    // fetchBudgetData(setBudgetData)
  }
  return (
    <Container>
      {console.log("THE BUDGET DATA FOR PRIMARY ACC DETAILS: ", budgetData)}
      <PrimaryAccountDetails
        budget={
          budgetData !== null && budgetData.budget ? budgetData.budget : null
        }
      />
      {budgetData && (
        <BudgetContext.Consumer>
          {value => {
            console.log("WHAT IS THE VALUE?!!>!: ", value)
            return (
              <div id="buttons-and-table-container">
                <TransactButtons reducer={value} />
                {/*
                  AggregatedBudgetDataDisplay contains the dropdowns for filtering
                  expense_types, years, and months.
                  And the resulting display/table to present the data
                */}
                <AggregatedBudgetDataDisplay reducer={value} />
              </div>
            )
          }}
        </BudgetContext.Consumer>
      )}
    </Container>
  )
}

const fetchBudgetData = async setBudgetData => {
  const result = await axios.get(endpoints.GET_ACCOUNT_URL)
  console.log("fetchBudgetData result: ", result.data)
  setBudgetData(result.data)
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

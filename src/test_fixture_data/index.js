const initialGetAccountData = {
  budget_tracker: {
    budget: {
      account_balance: 0,
      budget_exceeded: false,
      budget_set: false,
      current_budget: null,
    },
    limit_requests: false,
    request_limit: 0,
    serviced_requests: 0,
    years_tracked: {
      2019: {
        months_tracked: {
          3: {
            budget: 0,
            budget_exceeded: false,
            deposits: [],
            necessary_expenses: [],
            total_deposited: 0,
            total_necessary_expenses: 0,
            total_unnecessary_expenses: 0,
            unnecessary_expenses: [],
          },
        },
      },
    },
  },
}

// For supplying user input to tests
const getAccountInput = [
  {
    labelText: "Account Name",
    newInputValue: "Primary",
  },
]

module.exports = {
  initialGetAccountData,
  getAccountInput,
}

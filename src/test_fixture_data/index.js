const initialGetAccountData = {
  years_tracked: {
    2019: {
      months_tracked: {
        4: {
          unnecessary_expenses: [],
          total_unnecessary_expenses: 0,
          total_necessary_expenses: 0,
          total_deposited: 0,
          necessary_expenses: [],
          deposits: [],
          budget_exceeded: false,
          budget: 0,
        },
      },
    },
  },
  current_year: 2019,
  current_month: 4,
  budget: {
    current_budget: null,
    budget_set: false,
    budget_exceeded: false,
    account_balance: 0,
  },
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
// }

const fakeDepositsArr = [
  {
    category: "DEPOSIT",
    type: "Check",
    amount: 400000,
    date: "TBD",
  },
  {
    category: "DEPOSIT",
    type: "Check",
    amount: 10000,
    date: "TBD",
  },
]

const fakeNecessaryExpensesArr = [
  {
    category: "NECESSARY_EXPENSE",
    type: "Rent",
    amount: 360000,
    date: "TBD",
  },
  {
    category: "NECESSARY_EXPENSE",
    type: "Groceries",
    amount: 7000,
    date: "TBD",
  },
]

const fakeUnnecessaryExpensesArr = [
  {
    category: "UNNECESSARY_EXPENSE",
    type: "Coffee",
    amount: 5000,
    date: "TBD",
  },
  {
    category: "UNNECESSARY_EXPENSE",
    type: "Eat out",
    amount: 2000,
    date: "TBD",
  },
]

const accountDataWithUpdates = {
  years_tracked: {
    2018: {
      months_tracked: {
        11: {
          budget: 100000,
          budget_exceeded: false,
          deposits: fakeDepositsArr,
          necessary_expenses: fakeNecessaryExpensesArr,
          unnecessary_expenses: fakeUnnecessaryExpensesArr,
          total_deposited: 410000,
          total_necessary_expenses: 367000,
          total_unnecessary_expenses: 7000,
        },
        12: {
          budget: 80000,
          budget_exceeded: false,
          deposits: fakeDepositsArr,
          necessary_expenses: fakeNecessaryExpensesArr,
          unnecessary_expenses: fakeUnnecessaryExpensesArr,
          total_deposited: 410000,
          total_necessary_expenses: 367000,
          total_unnecessary_expenses: 7000,
        },
      },
    },
    2019: {
      months_tracked: {
        1: {
          budget: 100000,
          budget_exceeded: false,
          deposits: fakeDepositsArr,
          necessary_expenses: fakeNecessaryExpensesArr,
          unnecessary_expenses: fakeUnnecessaryExpensesArr,
          total_deposited: 0,
          total_necessary_expenses: 367000,
          total_unnecessary_expenses: 7000,
        },
      },
    },
  },
  current_year: 2019,
  current_month: 4,
  budget: {
    current_budget: null,
    budget_set: false,
    budget_exceeded: false,
    account_balance: 2600000,
  },
}

// {
//   budget_tracker: {
//     budget: {
//       account_balance: 2600000,
//       budget_exceeded: false,
//       budget_set: false,
//       current_budget: null,
//     },
//     limit_requests: false,
//     request_limit: 0,
//     serviced_requests: 0,
//     years_tracked: {
//       2018: {
//         months_tracked: {
//           11: {
//             budget: 100000,
//             budget_exceeded: false,
//             deposits: fakeDepositsArr,
//             necessary_expenses: fakeNecessaryExpensesArr,
//             unnecessary_expenses: fakeUnnecessaryExpensesArr,
//             total_deposited: 410000,
//             total_necessary_expenses: 367000,
//             total_unnecessary_expenses: 7000,
//           },
//           12: {
//             budget: 80000,
//             budget_exceeded: false,
//             deposits: fakeDepositsArr,
//             necessary_expenses: fakeNecessaryExpensesArr,
//             unnecessary_expenses: fakeUnnecessaryExpensesArr,
//             total_deposited: 410000,
//             total_necessary_expenses: 367000,
//             total_unnecessary_expenses: 7000,
//           },
//         },
//       },
//       2019: {
//         months_tracked: {
//           1: {
//             budget: 100000,
//             budget_exceeded: false,
//             deposits: fakeDepositsArr,
//             necessary_expenses: fakeNecessaryExpensesArr,
//             unnecessary_expenses: fakeUnnecessaryExpensesArr,
//             total_deposited: 0,
//             total_necessary_expenses: 367000,
//             total_unnecessary_expenses: 7000,
//           },
//         },
//       },
//     },
//   },
// }

const initialStateWithoutTransactions = {
  data: initialGetAccountData,
  inProgress: false,
}

const initialStateWithTransactions = {
  data: accountDataWithUpdates,
  inProgress: false,
}

// For supplying user input to tests
const getAccountInput = [
  {
    labelText: "Account Name",
    newInputValue: "Primary",
  },
]

const successfulDepositResponse = {
  account_balance: 5000000,
  total_deposited: 4000000,
  deposits: [{ income_source: "check", deposit_amount: 4000000 }],
}

module.exports = {
  initialStateWithoutTransactions,
  initialStateWithTransactions,
  getAccountInput,
  accountDataWithUpdates,
  successfulDepositResponse,
}

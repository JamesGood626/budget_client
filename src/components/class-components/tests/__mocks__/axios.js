// REMEMBER: the jest.mock/1 call inside of a test file must
// pass in an argument of a string that matches the name of the
// mocked file for that module. i.e. jest.mock("axios")
// If I had named this get_account_axios.js, then jest would never detect this
// mocked file.
import { initialStateWithoutTransactions } from "../../../../test_fixture_data"
import endpoints from "../../../../config/api_endpoints"

const mockAxios = {
  create: () => mockAxios,
  //   get: url => Promise.resolve(),
  get: url => {
    switch (url) {
      case endpoints.GET_ACCOUNT:
        return Promise.resolve(initialStateWithoutTransactions)
    }
  },
  noPost: url => {
    return Promise.resolve({ data: { message: "Should never see this." } })
  },
}

// This is what is called a manual mock
// Documentation -> https://jestjs.io/docs/en/manual-mocks
module.exports = mockAxios

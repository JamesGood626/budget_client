// REMEMBER: the jest.mock/1 call inside of a test file must
// pass in an argument of a string that matches the name of the
// mocked file for that module. i.e. jest.mock("axios")
// If I had named this get_account_axios.js, then jest would never detect this
// mocked file.
import { initialGetAccountData } from "../../../../test_fixture_data"
import { BUDGET_API } from "../../../../config"

const GET_ACCOUNT_DATA = `${BUDGET_API}/get-account`

const getAccountData = {
  data: initialGetAccountData,
}

const mockAxios = {
  create: () => mockAxios,
  //   get: url => Promise.resolve(),
  //   get: url => {
  //     console.log("THE URL: ", url)
  //     switch (url) {
  //       case GET_ACCOUNT_DATA:
  //         return Promise.resolve(getAccountData)
  //     }
  //   },
  get: (url, params) => {
    console.log("THE URL: ", url)
    console.log("THE params: ", params)
    switch (url) {
      case GET_ACCOUNT_DATA:
        return Promise.resolve(getAccountData)
    }
  },
  noPost: url => {
    return Promise.resolve({ data: { message: "Should never see this." } })
  },
}

// This is what is called a manual mock
// Documentation -> https://jestjs.io/docs/en/manual-mocks
module.exports = mockAxios

import React from "react"
import { Router } from "@reach/router"
import Layout from "../components/layout"
import PrivateRoute from "../components/helper-components/auth/privateRoute"
import BudgetCoordinator from "../components/class-components/BudgetCoordinator"
import Login from "../components/functional-components/login"
import Signup from "../components/functional-components/signup"

const App = () => (
  <Layout>
    {({ authenticated, login }) => {
      return (
        <Router>
          <Signup path="/app/signup" />
          <Login path="/app/login" login={login} />
          <PrivateRoute
            path="/app/budget"
            authenticated={authenticated}
            component={BudgetCoordinator}
          />
        </Router>
      )
    }}
  </Layout>
)

export default App

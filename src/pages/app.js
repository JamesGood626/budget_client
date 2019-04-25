import React from "react"
import axios from "axios"
import { ThemeProvider } from "styled-components"
import { Router } from "@reach/router"
import Layout from "../components/layout"
import PrivateRoute from "../components/helper-components/auth/privateRoute"
import BudgetCoordinator from "../components/class-components/BudgetCoordinator"
import Login from "../components/functional-components/login"
import Signup from "../components/functional-components/signup"

axios.defaults.withCredentials = true

const theme = {
  white: "#fff",
  darkGreen: "#1d470c",
  lightGreen: "#54d423",
  red: "#ff5e5e",
  grey: "#979797",
  // could add a smallestWidth for < 320px
  smallWidth: "20rem",
  mediumWidth: "26rem",
  largeWidth: "32rem",
  headerThreeSmall: "0.9rem",
  headerThreeMedium: "1rem",
  headerThreeLarge: "1.2rem",
  textSmall: "0.85rem",
  textMedium: "0.9rem",
}

const App = () => (
  <Layout>
    {({ authenticated, login }) => {
      return (
        <ThemeProvider theme={theme}>
          <Router>
            <Signup path="/app/signup" />
            <Login path="/app/login" login={login} />
            <PrivateRoute
              path="/app/budget"
              authenticated={authenticated}
              component={BudgetCoordinator}
            />
          </Router>
        </ThemeProvider>
      )
    }}
  </Layout>
)

export default App

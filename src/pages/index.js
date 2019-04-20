import React from "react"
import BudgetCoordinator from "../components/class-components/BudgetCoordinator"
import { Link } from "gatsby"

import Layout from "../components/layout"

const isLoggedIn = () => false

const IndexPage = () => {
  return (
    <Layout>
      {/* <BudgetCoordinator /> */}
      {isLoggedIn() ? (
        <>
          {/* Redirect to Budget view */}
          You are logged in, so check your{" "}
          <Link to="/app/profile">profile</Link>
        </>
      ) : (
        <>
          You should <Link to="/app/login">log in</Link> to see restricted
          content
        </>
      )}
    </Layout>
  )
}

export default IndexPage

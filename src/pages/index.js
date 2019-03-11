import React from "react"
import BudgetCoordinator from "../components/class-components/BudgetCoordinator"
// import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
// import SEO from "../components/seo"

const IndexPage = () => {
  return (
    <Layout>
      {/* <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} /> */}
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div>
      <BudgetCoordinator />
    </Layout>
  )
}

export default IndexPage

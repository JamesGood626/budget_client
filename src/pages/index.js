import React from "react"
import styled from "styled-components"

import Layout from "../components/layout"

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`

const IndexPage = () => {
  return (
    <Layout>
      <Container>
        <h1>Welcome to Budget Slayer 9000!</h1>
        <select className="num-select">
          <option value="one">One</option>
          <option value="two">Two</option>
          <option value="three">Three</option>
        </select>
      </Container>
    </Layout>
  )
}

export default IndexPage

import React from "react"
import styled from "styled-components"
import AuthForm from "./block-components/auth-form"
import endpoints from "../../config/api_endpoints"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`

const signup = () => {
  return (
    <Container>
      <AuthForm apiEndpoint={endpoints.SIGNUP_URL} btnText="Sign Up!" />
    </Container>
  )
}

export default signup

import React from "react"
import styled from "styled-components"
import AuthForm from "components/functional-components/auth-feature/auth-form"
import endpoints from "config/api_endpoints"

// If you want this container to fill up the remaining height of the
// body. -> use styled-components theming, and subtract the navbarHeight from 100vh.
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`

const login = ({ dispatchLogin }) => {
  console.log(`The login function: ${dispatchLogin}`)
  return (
    <Container>
      <AuthForm
        apiEndpoint={endpoints.LOGIN_URL}
        btnText="Log In!"
        dispatchLogin={dispatchLogin}
      />
    </Container>
  )
}

export default login

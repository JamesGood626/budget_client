import React from "react"
import styled from "styled-components"
import AuthForm from "./block-components/auth-form"
import endpoints from "../../config/api_endpoints"

// If you want this container to fill up the remaining height of the
// body. -> use styled-components theming, and subtract the navbarHeight from 100vh.
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`

const login = ({ login }) => {
  console.log(`The login function: ${login}`)
  return (
    <Container>
      <AuthForm
        apiEndpoint={endpoints.LOGIN_URL}
        btnText="Log In!"
        login={login}
      />
    </Container>
  )
}

export default login

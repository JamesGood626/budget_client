import React from "react"
import axios from "axios"
import styled from "styled-components"
import { Link } from "gatsby"
import { navigate } from "@reach/router"
import endpoints from "config/api_endpoints"

const LOGOUT_SUCCESS = "LOGOUT_SUCCESS"

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 4rem;
  padding: 0 2rem 0 2rem;
  /* dark green text */
  color: #1d470c;
  background: #fff;

  nav {
    display: flex;
    width: 10rem;
    justify-content: space-around;

    a {
      /* dark green text */
      color: #1d470c;
      text-decoration: none;

      :hover {
        color: orange;
      }
    }
  }
`

const isLoggedIn = () => false

const logout = async (e, dispatchLogout) => {
  e.preventDefault()
  const signoutResult = await axios.post(endpoints.LOGOUT_URL)
  console.log("The signout Result: ", signoutResult)
  // TODO:
  // Two possible responses here
  // Logout Success! or // Logout Failed!
  // If logout fail occurs then the hashed remember token
  // wasn't removed from GenServer state...
  // In which case a message should be displayed indicating that something went wrong
  // and prompting the user to try logging out again.

  console.log("logout called!")
  // If successful:
  // if (signoutResult.data.message === LOGOUT_SUCCESS) {}
  dispatchLogout()
  navigate(`/app/login`)
}

const navbar = ({ authenticated, dispatchLogout }) => {
  console.log(`this is authenticated ${authenticated}`)
  return (
    <Container>
      <span>You are not logged in</span>

      <nav>
        {` `}
        {authenticated ? (
          <a href="/" onClick={e => logout(e, dispatchLogout)}>
            Logout
          </a>
        ) : (
          <>
            <Link to="/app/login">Log In</Link>
            {` `}
            <Link to="/app/signup">Sign Up</Link>
          </>
        )}
      </nav>
    </Container>
  )
}

export default navbar

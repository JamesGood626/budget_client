import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import { navigate } from "@reach/router"

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

const logout = fn => {
  console.log("logout called!")
  fn()
}
const navbar = ({ authenticated, logout }) => {
  console.log(`this is authenticated ${authenticated}`)
  return (
    <Container>
      <span>You are not logged in</span>

      <nav>
        {` `}
        {authenticated ? (
          <a
            href="/"
            onClick={e => {
              e.preventDefault()
              logout(() => navigate(`/app/login`))
            }}
          >
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
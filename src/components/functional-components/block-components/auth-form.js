import React, { useState } from "react"
import axios from "axios"
import styled from "styled-components"
import endpoints from "../../../config/api_endpoints"
import { navigate } from "gatsby"
import Button from "../button"

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 20rem;
  width: 20rem;
  padding: 0 1.8rem 0 1.8rem;
  background: #fcfcfc;
  margin-top: 20vh;
  margin-bottom: 20vh;
  border-radius: 8px;
  box-shadow: 0px 2px 4px 0 rgba(0, 0, 0, 35%);
  /* dark green text */
  color: #1d470c;

  label {
    font-size: 1rem;
    font-weight: bold;
    margin-top: 1.2rem;
    transform: translateY(1.6rem);
    transition: transform 0.4s;
  }

  .input-active {
    transform: translate(-1.2rem, 0.2rem) scale(0.85);
  }

  input {
    height: 2rem;
    font-size: 1rem;
    border-top: 0px solid rgba(0, 0, 0, 0);
    border-left: 0px solid rgba(0, 0, 0, 0);
    border-right: 0px solid rgba(0, 0, 0, 0);
    border-bottom: 2px solid #20e131;

    &:focus {
      outline: none;
    }
  }

  #password {
    margin-bottom: 1.2rem;
  }

  button {
    margin-top: 1.2rem;
    padding: 0.6rem 1.2rem 0.6rem 1.2rem;
  }
`

const authForm = ({ apiEndpoint, btnText, login }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailFocused, setEmailFocused] = useState(false)
  const [passwordFocused, setPasswordFocused] = useState(false)

  return (
    <Form
      type="submit"
      onSubmit={e => handleSubmit(e, email, password, login, apiEndpoint)}
    >
      <label htmlFor="email" className={emailFocused ? "input-active" : null}>
        Email
      </label>
      <input
        id="email"
        type="text"
        onChange={e => handleChange(e, setEmail)}
        onFocus={() => setEmailFocused(!emailFocused)}
        onBlur={() => setEmailFocused(!emailFocused)}
      />
      <label
        htmlFor="password"
        className={passwordFocused ? "input-active" : null}
      >
        Password
      </label>
      <input
        id="password"
        type="text"
        onChange={e => handleChange(e, setPassword)}
        onFocus={() => setPasswordFocused(!passwordFocused)}
        onBlur={() => setPasswordFocused(!passwordFocused)}
      />
      <Button
        radius={25}
        shadow={true}
        padding={[0.8, 3.2]}
        minHeight={3}
        topColor="#46FF90"
        bottomColor="#20E131"
        fontColor="#fff"
      >
        {btnText}
      </Button>
    </Form>
  )
}

const handleChange = (e, setField) => {
  const { value } = e.target
  setField(value)
}

const handleSubmit = async (e, email, password, login, apiEndpoint) => {
  e.preventDefault()
  console.log("email: ", email)
  console.log("password: ", password)
  console.log(`endpointURL: ${apiEndpoint}`)
  const result = await axios.post(apiEndpoint, {
    email,
    password,
  })
  if (
    result.data.message === "Login Success!" &&
    apiEndpoint === endpoints.LOGIN_URL
  ) {
    login()
    navigate("/app/budget")
  }
  console.log("Result from Elixir API: ", result)
}

export default authForm

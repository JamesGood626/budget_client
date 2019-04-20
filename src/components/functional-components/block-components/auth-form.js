import React, { useState } from "react"
import axios from "axios"
import styled from "styled-components"
import endpoints from "../../../config/api_endpoints"
import { navigate } from "gatsby"

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 18rem;
  width: 18rem;
  padding: 0 1.8rem 0 1.8rem;
  background: #fcfcfc;

  label {
    margin-top: 1.2rem;
  }

  input {
    height: 2rem;
    margin-top: 0.6rem;
  }

  button {
    margin-top: 1.2rem;
    padding: 0.6rem 1.2rem 0.6rem 1.2rem;
  }
`

const authForm = ({ apiEndpoint, btnText, login }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  return (
    <Form
      type="submit"
      onSubmit={e => handleSubmit(e, email, password, login, apiEndpoint)}
    >
      <label htmlFor="email">Email</label>
      <input id="email" type="text" onChange={e => handleChange(e, setEmail)} />
      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="text"
        onChange={e => handleChange(e, setPassword)}
      />
      <button>{btnText}</button>
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

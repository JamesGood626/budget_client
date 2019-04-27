import React, { useState } from "react"
import axios from "axios"
import endpoints from "../../../config/api_endpoints"
import { navigate } from "gatsby"
import Button from "../button"
import Form from "./form-styles"
import handleLabelAnimation from "../expense-deposit-inputs/label-anim-helper"

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
        onFocus={e => handleLabelAnimation(e, setEmailFocused, emailFocused)}
        onBlur={e => handleLabelAnimation(e, setEmailFocused, emailFocused)}
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
        onFocus={e =>
          handleLabelAnimation(e, setPasswordFocused, passwordFocused)
        }
        onBlur={e =>
          handleLabelAnimation(e, setPasswordFocused, passwordFocused)
        }
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
  const { id, value } = e.target
  // Use this when adding validation logic.
  // let payload = {value, error: ""}
  if (id === "email") {
    // in validateEmail
    // run email validation logic/else set {value: "", error: "message"}
  }
  if (id === "password") {
    // in validatePassword(value)
    // run password validation logic/else set {value: "", error: "message"}
  }
  setField(value)
}

const handleSubmit = async (e, email, password, login, apiEndpoint) => {
  e.preventDefault()
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

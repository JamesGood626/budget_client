import React, { useState } from "react"
import axios from "axios"
import { navigate } from "gatsby"
import endpoints from "config/api_endpoints"
import Button from "components/functional-components/foundational-components/button"
import Form from "components/functional-components/foundational-components/form-styles"
import handleLabelAnimation from "components/functional-components/expense-deposit-feature/expense-deposit-inputs/label-anim-helper"

const authForm = ({ apiEndpoint, btnText, login }) => {
  const [email, setEmail] = useState({ value: "", error: false })
  const [password, setPassword] = useState({ value: "", error: false })
  const [emailFocused, setEmailFocused] = useState(false)
  const [passwordFocused, setPasswordFocused] = useState(false)

  return (
    <Form
      type="submit"
      onSubmit={e =>
        handleSubmitOrFail(
          e,
          email.value,
          password.value,
          setEmail,
          setPassword,
          login,
          apiEndpoint
        )
      }
    >
      <label htmlFor="email" className={emailFocused ? "input-active" : null}>
        Email
      </label>
      <input
        id="email"
        type="text"
        onChange={e => handleChange(e.target.value, setEmail)}
        onFocus={e => handleLabelAnimation(e, setEmailFocused, emailFocused)}
        onBlur={e => handleLabelAnimation(e, setEmailFocused, emailFocused)}
      />
      {email.error && <span className="error-text">{email.error}</span>}
      <label
        htmlFor="password"
        className={passwordFocused ? "input-active" : null}
      >
        Password
      </label>
      <input
        id="password"
        type="password"
        onChange={e => handleChange(e.target.value, setPassword)}
        onFocus={e =>
          handleLabelAnimation(e, setPasswordFocused, passwordFocused)
        }
        onBlur={e =>
          handleLabelAnimation(e, setPasswordFocused, passwordFocused)
        }
      />
      {password.error && <span className="error-text">{password.error}</span>}
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

// TODO:
// Make more comprehensive
const validateEmail = str => {
  if (str.indexOf("@") > 0) {
    return true
  }
  return false
}

// TODO:
// Make more comprehensive
const validatePassword = str => {
  return str.length > 10
}

const handleChange = (value, setField) => {
  setField({ value, error: false })
}

const handleSubmitOrFail = async (
  e,
  email,
  password,
  setEmail,
  setPassword,
  login,
  apiEndpoint
) => {
  e.preventDefault()
  const result = await handleSubmit(email, password, login, apiEndpoint)
  console.log("WTF is result: ", result)
  const errorsPresent = result.hasOwnProperty("length") && result.length > 0
  if (errorsPresent) {
    result.map(obj =>
      obj.error === "Invalid email" ? setEmail(obj) : setPassword(obj)
    )
  }
}

const handleSubmit = async (email, password, login, apiEndpoint) => {
  const result = validateUserInput(email, password)
  const errorsPresent = result.hasOwnProperty("length") && result.length > 0
  if (errorsPresent) {
    return result
  }
  const loginSuccess = await postLoginInput(email, password, apiEndpoint)
  if (loginSuccess) {
    redirectToBudgetPage(login)
    return true
  } else {
    // create another useState to display this...?
    // Am I using too many useStates
    return "Woops, something went wrong"
  }
}

// Pass in validateEmail and validatePassword as args instead? Then I'd have so many args being
// passed into handleSubmitOrFail <- what in the name of referential transparency
const validateUserInput = (email, password) => {
  let errors = []
  if (!validateEmail(email)) {
    errors = [...errors, { value: email, error: "Invalid email" }]
  }
  if (!validatePassword(password)) {
    errors = [...errors, { value: password, error: "Invalid password" }]
  }
  return errors
}

const postLoginInput = async (email, password, apiEndpoint) => {
  const result = await axios.post(apiEndpoint, {
    email,
    password,
  })
  const loginSuccess =
    result.data.message === "Login Success!" &&
    apiEndpoint === endpoints.LOGIN_URL
  if (loginSuccess) {
    return true
  }
  return false
}

const redirectToBudgetPage = login => {
  login()
  navigate("/app/budget")
}

export default authForm

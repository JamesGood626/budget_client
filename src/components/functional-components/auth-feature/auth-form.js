import React, { useState } from "react"
import axios from "axios"
import { navigate } from "gatsby"
import endpoints from "config/api_endpoints"
import Button from "components/functional-components/foundational-components/button"
import Form from "components/functional-components/foundational-components/form-styles"
import handleLabelAnimation from "components/functional-components/expense-deposit-feature/expense-deposit-inputs/label-anim-helper"

const LOGIN_SUCCESS = "LOGIN_SUCCESS"
const SIGNUP_SUCCESS = "SIGNUP_SUCCESS"

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
  return str.length >= 10
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
  dispatchLogin,
  apiEndpoint
) => {
  e.preventDefault()
  const result = await handleSubmit(email, password, dispatchLogin, apiEndpoint)
  const errorsPresent = result.hasOwnProperty("length") && result.length > 0
  if (errorsPresent) {
    result.map(obj =>
      obj.error === "Invalid email" ? setEmail(obj) : setPassword(obj)
    )
  }
}

const handleSubmit = async (email, password, dispatchLogin, apiEndpoint) => {
  const result = validateUserInput(email, password)
  const errorsPresent = result.hasOwnProperty("length") && result.length > 0
  if (errorsPresent) {
    return result
  }
  const postSuccess = await postInput(email, password, apiEndpoint)
  if (postSuccess === "LOGIN_SUCCESS") {
    dispatchLogin()
    redirectToBudgetPage()
    return true
  } else if (postSuccess === "SIGNUP_SUCCESS") {
    // TODO: set state w/ a useState to display signup success UI.
    return true
  } else if (postSuccess === "EMAIL_TAKEN") {
    // SetState to show error ui
    return false
  } else {
    // create another useState to display error UI.
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

const postInput = async (email, password, apiEndpoint) => {
  const {
    status,
    data: { message },
  } = await axios.post(apiEndpoint, {
    email,
    password,
  })
  console.log("THE MESSAGE: ", message)
  if (status === 200) {
    const loginSuccess =
      message === LOGIN_SUCCESS && apiEndpoint === endpoints.LOGIN_URL
    if (loginSuccess) {
      return LOGIN_SUCCESS
    }
    return SIGNUP_SUCCESS
  }

  if (status === 422) {
    console.log("EMAIL_TAKEN")
    return "EMAIL_TAKEN"
  }
  // Show error UI.
  return "Oops... Something went wrong."
}

const redirectToBudgetPage = () => navigate("/app/budget")

const authForm = ({ apiEndpoint, btnText, dispatchLogin }) => {
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
          dispatchLogin,
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

export default authForm

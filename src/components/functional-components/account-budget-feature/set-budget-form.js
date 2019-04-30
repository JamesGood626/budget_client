import React from "react"
import Form from "../foundational-components/form-styles"

const setBudgetForm = ({ toggleModal, dateData }) => {
  return (
    <Form id="form">
      <h1>Damn</h1>
      <div onClick={() => toggleModal("")}>X</div>
      <input type="text" value="" />
    </Form>
  )
}

export default setBudgetForm

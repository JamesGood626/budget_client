import React, { useState, useEffect } from "react"
import axios from "axios"
import endpoints from "../../config/api_endpoints"

const getAccountForm = ({ setBudgetData }) => {
  const accountName = useAccountName()

  const handleSubmit = async e => {
    e.preventDefault()
    const { data } = await axios.get(endpoints.GET_ACCOUNT, {
      accountName: accountName.value,
    })
    console.log("BUDGET DATA BEING SET: ", data)
    setBudgetData(data)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="accountName">Account Name</label>
        <input id="accountName" {...accountName} />
        <button type="submit" data-testid="getAccountSubmitBtn">
          Submit
        </button>
      </form>
    </div>
  )
}

const useAccountName = () => {
  const [accountName, setAccountName] = useState("")

  const changeAccountName = e => {
    setAccountName(e.target.value)
  }

  return {
    value: accountName,
    onChange: changeAccountName,
  }
}

export default getAccountForm

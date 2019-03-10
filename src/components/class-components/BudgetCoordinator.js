import React, { Component } from "react"
import GetAccountForm from "../functional-components/get-account-form"
import BudgetDisplay from "./BudgetDisplay"

export default class BudgetCoordinator extends Component {
  state = {
    budgetData: null,
  }

  setBudgetData = budgetData => {
    this.setState({ budgetData })
  }

  componentDidUpdate = (prevProps, prevState) => {
    console.log("THE NEW STATE: ", this.state)
  }

  render() {
    const { budgetData } = this.state
    return (
      <div>
        {budgetData === null ? (
          <GetAccountForm setBudgetData={this.setBudgetData} />
        ) : (
          <BudgetDisplay budgetData={budgetData} />
        )}
      </div>
    )
  }
}

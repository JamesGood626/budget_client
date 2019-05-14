describe("Budget page set budget feature", () => {
  beforeEach(() => {
    // Need to refactor codebase to not require entering in email and password for every setup.
    cy.seedAndVisitBudgetPage()
  })

  it("sets a new budget", () => {
    cy.route("POST", "/api/account", {
      message: "Successfully set your budget for the month.",
      budget_amount: 100000,
    })
    cy.contains("Total Balance:")
    cy.get(".set-budget-btn").click()
    cy.getInputAndEnter("#set-budget-input", "100000")

    cy.get(".set-budget-submit-btn").click()
    cy.get(".confirm-warning-btn").click()

    //   cy.get("#expense")
    //     .focus()
    //     .type("Rent")
    //   cy.get("#amount")
    //     .focus()
    //     .type("9000")
    //   cy.get(".expense-submit-btn").click()
    //   cy.contains("Warning")
    //   cy.get(".confirm-warning-btn").click()
    //   cy.get(".expense").should("have.text", "$9000")
  })
})

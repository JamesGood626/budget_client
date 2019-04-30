describe("Budget page expend features", () => {
  beforeEach(() => {
    // Need to refactor codebase to not require entering in email and password for every setup.
    cy.seedAndVisitBudgetPage()
  })

  it.only("creates a necessary expense", () => {
    cy.route("POST", "/api/necessary-expense", {
      category: "NECESSARY_EXPENSE",
      type: "Rent",
      amount: 9000,
      account_balance: -1000,
      date: "TBD",
    })
    cy.contains("Total Balance:")
    cy.get(".expense-btn").click()
    cy.get("#expense")
      .focus()
      .type("Rent")
    cy.get("#amount")
      .focus()
      .type("9000")
    cy.get(".expense-submit-btn").click()
    cy.get(".confirm-warning-btn").click()
    cy.get(".expense").should("have.text", "$9000")

    // Expect warning message that user can't delete this after it's created

    // After clicking ok... post to /api/deposit should occur
  })
})

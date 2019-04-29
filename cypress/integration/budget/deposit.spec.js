describe("Budget page deposit features", () => {
  beforeEach(() => {
    // Need to refactor codebase to not require entering in email and password for every setup.
    cy.seedAndVisitBudgetPage()
  })

  it.only("creates a deposit", () => {
    cy.route("POST", "/api/deposit", {
      category: "DEPOSIT",
      type: "Check",
      amount: 4000,
      account_balance: 8000,
      date: "TBD",
    })
    cy.contains("Total Balance:")
    cy.get(".deposit-btn").click()
    cy.get("#income-source")
      .focus()
      .type("Check")
    cy.get("#deposit-amount")
      .focus()
      .type("4000")
    cy.get(".deposit-submit-btn").click()
    cy.get(".confirm-warning-btn").click()

    // Expect warning message that user can't delete this after it's created

    // After clicking ok... post to /api/deposit should occur
  })
})
